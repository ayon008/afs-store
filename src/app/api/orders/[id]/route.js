import { NextResponse } from 'next/server'
import { wcFetch } from '@/lib/wc.server'

function siteOrigin() {
  const base = process.env.WP_BASE_URL
  if (!base) throw new Error('WP_BASE_URL is not set')
  return new URL(base).origin
}

export async function GET(req, { params }) {
  const { id } = await params
  const orderId = String(id || '')
  const order_key = req.nextUrl.searchParams.get('order_key')

  if (!orderId) return NextResponse.json({ error: 'Order ID required' }, { status: 400 })

  try {
    console.log('[API] GET /api/orders/' + orderId, { order_key })

    // Use wcFetch to get the order
    const searchParams = order_key ? { order_key } : {}
    const order = await wcFetch(`/orders/${orderId}`, { searchParams })

    console.log('[API] Order fetched:', { id: order?.id, status: order?.status })

    return NextResponse.json(order)
  } catch (e) {
    console.error('[API] Order fetch error:', e?.message || e)
    return NextResponse.json({ error: e?.message || 'Order not found' }, { status: 404 })
  }
}
