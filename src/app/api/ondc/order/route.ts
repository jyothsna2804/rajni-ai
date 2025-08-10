import { NextRequest, NextResponse } from 'next/server'
import { placeOrder, type OndcOrderRequest } from '@/lib/ondc'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { item, quantity, fulfillmentAddress, billingName, paymentMethod } = body || {}

    if (!item || typeof quantity !== 'number') {
      return NextResponse.json({ error: 'Missing item or quantity' }, { status: 400 })
    }

    const result = await placeOrder({ item, quantity, fulfillmentAddress, billingName, paymentMethod } as OndcOrderRequest)
    return NextResponse.json(result)
  } catch (err) {
    console.error('[ONDC] order error', err)
    return NextResponse.json({ error: 'Order failed' }, { status: 500 })
  }
}