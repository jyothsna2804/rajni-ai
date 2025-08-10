import type { } from 'node:crypto'

export interface OndcConfig {
  baseUrl?: string;
  provider: 'mock' | 'bap';
  country: string;
  city: string;
  domain: string;
  bapId?: string;
  bapUri?: string;
  subscriberId?: string;
  subscriberUri?: string;
  uniqueKeyId?: string;
  privateKey?: string;
}

export interface SearchResultItem {
  id: string;
  name: string;
  price: { currency: string; value: number };
  provider: { id?: string; name?: string };
  bppId?: string;
  bppUri?: string;
  location?: string;
}

export interface OndcSearchParams {
  query: string;
  city?: string;
  limit?: number;
}

export interface OndcOrderRequest {
  item: SearchResultItem;
  quantity: number;
  fulfillmentAddress?: string;
  billingName?: string;
  paymentMethod?: 'COD' | 'PREPAID';
}

export interface OndcOrderResponse {
  orderId: string;
  status: 'PLACED' | 'PENDING' | 'FAILED';
  message?: string;
}

export function getOndcConfig(): OndcConfig {
  const cfg: OndcConfig = {
    baseUrl: process.env.ONDC_API_BASE_URL,
    provider: (process.env.ONDC_PROVIDER as 'mock' | 'bap') || (process.env.ONDC_API_BASE_URL ? 'bap' : 'mock'),
    country: process.env.ONDC_COUNTRY || 'IND',
    city: process.env.ONDC_CITY || 'DELHI',
    domain: process.env.ONDC_DOMAIN || 'ONDC:RET10',
    bapId: process.env.ONDC_BAP_ID,
    bapUri: process.env.ONDC_BAP_URI,
    subscriberId: process.env.ONDC_SUBSCRIBER_ID,
    subscriberUri: process.env.ONDC_SUBSCRIBER_URI,
    uniqueKeyId: process.env.ONDC_UNIQUE_KEY_ID,
    privateKey: process.env.ONDC_SIGNING_PRIVATE_KEY,
  };
  return cfg;
}

function normalizeQuery(message: string): string {
  return message.trim().replace(/\s+/g, ' ');
}

export type OndcIntent =
  | { type: 'search'; query: string }
  | { type: 'order'; productQuery: string; quantity?: number };

export function detectOndcIntent(message: string): OndcIntent | null {
  const m = message.toLowerCase();
  // Very lightweight heuristics
  const searchKeywords = ['buy', 'find', 'search', 'show me', 'price of', 'shopping for', 'looking for'];
  const orderKeywords = ['order', 'purchase', 'buy'];

  // Try to capture something like: "buy iPhone 14", "search Nike shoes"
  for (const kw of searchKeywords) {
    const idx = m.indexOf(kw);
    if (idx >= 0) {
      const query = normalizeQuery(message.slice(idx + kw.length));
      if (query.length > 0) return { type: 'search', query };
    }
  }

  // Try to capture order intent with explicit quantity
  // e.g., "order 2 packs of Maggi", "buy 1 iPhone 14"
  const qtyMatch = m.match(/(?:order|buy|purchase)\s+(\d+)\s+(.*)/i);
  if (qtyMatch && qtyMatch[2]) {
    const quantity = Math.max(1, parseInt(qtyMatch[1], 10));
    const productQuery = normalizeQuery(qtyMatch[2]);
    if (productQuery) return { type: 'order', productQuery, quantity };
  }

  // Fallback: if message starts with order/buy without explicit qty, default to 1
  for (const kw of orderKeywords) {
    const idx = m.indexOf(kw);
    if (idx === 0) {
      const productQuery = normalizeQuery(message.slice(kw.length));
      if (productQuery) return { type: 'order', productQuery, quantity: 1 };
    }
  }

  return null;
}

export async function searchProducts(params: OndcSearchParams): Promise<SearchResultItem[]> {
  const cfg = getOndcConfig();
  const query = normalizeQuery(params.query);
  const limit = params.limit ?? 5;

  if (cfg.provider === 'mock' || !cfg.baseUrl) {
    // Return mock data for development without credentials
    return mockSearch(query, limit);
  }

  // Minimalistic search call; actual ONDC Beckn flow is asynchronous and requires signing.
  // Here we assume an aggregator-compatible REST endpoint is provided in ONDC_API_BASE_URL.
  // This code intentionally avoids network-specific signing to keep integration pluggable.
  const url = `${cfg.baseUrl.replace(/\/$/, '')}/search`;
  const body = {
    context: {
      domain: cfg.domain,
      location: { country: cfg.country, city: cfg.city },
      bap_id: cfg.bapId,
      bap_uri: cfg.bapUri,
      transaction_id: cryptoRandomId('txn_'),
      message_id: cryptoRandomId('msg_'),
      timestamp: new Date().toISOString(),
      ttl: 'PT30S'
    },
    message: {
      intent: {
        item: { descriptor: { name: query } },
      },
    },
  } as const;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Integrators: add ONDC signing headers here if your aggregator requires them.
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // Fall back to mock on failure, but surface an error in console
    console.error(`[ONDC] search failed: ${res.status} ${await safeText(res)}`);
    return mockSearch(query, limit);
  }

  const data = await res.json().catch(() => ({}));
  const items: SearchResultItem[] = extractItemsFromSearchResponse(data).slice(0, limit);
  if (items.length === 0) return mockSearch(query, limit);
  return items;
}

function extractItemsFromSearchResponse(data: any): SearchResultItem[] {
  try {
    // Attempt to normalize common aggregator shapes
    const catalogs = data?.responses || data?.catalogs || data?.message?.catalogs || [];
    const results: SearchResultItem[] = [];
    for (const cat of catalogs) {
      const bppId = cat?.context?.bpp_id || cat?.bpp_id;
      const bppUri = cat?.context?.bpp_uri || cat?.bpp_uri;
      const providers = cat?.message?.catalog?.providers || cat?.providers || [];
      for (const p of providers) {
        const items = p?.items || [];
        for (const it of items) {
          const price = normalizePrice(it?.price || it?.tags?.price);
          results.push({
            id: String(it?.id ?? cryptoRandomId('item_')),
            name: String(it?.descriptor?.name ?? it?.name ?? 'Item'),
            price,
            provider: { id: p?.id, name: p?.descriptor?.name ?? p?.name },
            bppId,
            bppUri,
            location: p?.locations?.[0]?.address?.locality || undefined,
          });
        }
      }
    }
    return results;
  } catch {
    return [];
  }
}

function normalizePrice(raw: any): { currency: string; value: number } {
  if (!raw) return { currency: 'INR', value: 0 };
  if (typeof raw === 'object' && raw.currency && raw.value != null) {
    return { currency: String(raw.currency), value: Number(raw.value) };
  }
  const num = Number(raw);
  if (Number.isFinite(num)) return { currency: 'INR', value: num };
  return { currency: 'INR', value: 0 };
}

export async function placeOrder(req: OndcOrderRequest): Promise<OndcOrderResponse> {
  const cfg = getOndcConfig();
  if (cfg.provider === 'mock' || !cfg.baseUrl) {
    return { orderId: cryptoRandomId('ord_'), status: 'PLACED', message: 'Mock order placed' };
  }

  // As with search, assume an aggregator-compatible endpoint exists
  const url = `${cfg.baseUrl.replace(/\/$/, '')}/order`;
  const payload = {
    item: req.item,
    quantity: req.quantity,
    address: req.fulfillmentAddress,
    billing_name: req.billingName,
    payment_method: req.paymentMethod || 'COD',
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error(`[ONDC] order failed: ${res.status} ${await safeText(res)}`);
    return { orderId: cryptoRandomId('ord_'), status: 'FAILED', message: 'Provider rejected order' };
  }
  const data = await res.json().catch(() => ({}));
  const orderId = data?.orderId || data?.message?.order?.id || cryptoRandomId('ord_');
  return { orderId, status: 'PLACED' };
}

function cryptoRandomId(prefix: string): string {
  const rnd = Math.random().toString(36).slice(2, 10);
  return `${prefix}${rnd}`;
}

async function safeText(res: Response): Promise<string> {
  try { return await res.text(); } catch { return ''; }
}

export function formatSearchResultsForAssistant(results: SearchResultItem[], query: string): string {
  if (!results.length) return `I could not find results for "${query}" on ONDC. Try refining your query.`;
  const lines = results.slice(0, 5).map((r, idx) => {
    const price = r.price?.value ? `₹${r.price.value}` : 'N/A';
    const brand = r.provider?.name ? ` — ${r.provider?.name}` : '';
    return `${idx + 1}. ${r.name}${brand} — ${price}`;
  });
  const guidance = `Reply like: "Buy 1 <product name>" or "Order 2 <product name> to my home address".`;
  return [
    `Here are some ONDC results for "${query}":`,
    ...lines,
    '',
    guidance,
  ].join('\n');
}

function mockSearch(query: string, limit: number): SearchResultItem[] {
  const base: SearchResultItem[] = [
    { id: 'sku_iphone14', name: 'Apple iPhone 14 (128 GB)', price: { currency: 'INR', value: 57999 }, provider: { name: 'TechBazaar' } },
    { id: 'sku_nike_air', name: 'Nike Air Zoom Pegasus 40', price: { currency: 'INR', value: 9495 }, provider: { name: 'SportsHub' } },
    { id: 'sku_maggi', name: 'Maggi 2-Minute Noodles Masala (12 Pack)', price: { currency: 'INR', value: 168 }, provider: { name: 'GroceryGo' } },
    { id: 'sku_detergent', name: 'Surf Excel Matic Liquid Detergent (2L)', price: { currency: 'INR', value: 399 }, provider: { name: 'DailyNeeds' } },
    { id: 'sku_mi_band', name: 'Xiaomi Smart Band 8', price: { currency: 'INR', value: 2799 }, provider: { name: 'GizmoStore' } },
  ];
  // naive relevance boost
  const filtered = base.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
  return (filtered.length ? filtered : base).slice(0, limit);
}