import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/ondc'

export async function POST(req: NextRequest) {
  try {
    const { query, limit } = await req.json()
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 })
    }
    const items = await searchProducts({ query, limit: typeof limit === 'number' ? limit : 5 })
    return NextResponse.json({ items })
  } catch (err) {
    console.error('[ONDC] search error', err)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}