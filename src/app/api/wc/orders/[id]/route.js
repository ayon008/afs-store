import { NextResponse } from 'next/server'
import { wcFetch } from '@/lib/wc.server'

export async function GET(req, { params }) {
  const { id } = await params
  const order_key = req.nextUrl.searchParams.get('order_key')
  if (!id) return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
  try {
    // Fetch order from WooCommerce
    const order = await wcFetch(`orders/${id}`)
    // If order_key is provided, check it matches
    if (order_key && order.order_key && order.order_key !== order_key) {
      return NextResponse.json({ error: 'Order key mismatch' }, { status: 403 })
    }
    return NextResponse.json(order)
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Order not found' }, { status: 404 })
  }
}
