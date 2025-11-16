import { NextResponse } from 'next/server'
import { wcFetch, getSiteBaseFromEnv } from '@/lib/wc.server'

function getPaymentMethodTitle(method) {
  const titles = { cod: 'Cash on Delivery', bacs: 'Direct Bank Transfer', paypal: 'PayPal', stripe: 'Credit Card (Stripe)' }
  return titles[method] || 'Payment Method'
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body?.line_items?.length) return NextResponse.json({ error: 'No line items' }, { status: 400 })
    const baseEnv = process.env.WP_BASE_URL
    if (!baseEnv) return NextResponse.json({ error: 'WP_BASE_URL not set' }, { status: 500 })

    // Extract customer id from wc_session cookie if present
    const sessionToken = req.cookies.get('wc_session')?.value
    let customerId
    if (sessionToken) {
      try {
        // 1. URL decode
        const urlDecoded = decodeURIComponent(sessionToken)
        // 2. base64 decode
        const base64Decoded = Buffer.from(urlDecoded, 'base64').toString('utf-8')
        // 3. parse JSON
        const sessionData = JSON.parse(base64Decoded)
        customerId = sessionData.id
      } catch (e) { /* ignore */ }
    }

    const orderPayload = {
      billing: {
        first_name: body.billing.first_name,
        last_name: body.billing.last_name,
        address_1: body.billing.address_1,
        address_2: body.billing.address_2 || '',
        city: body.billing.city,
        state: body.billing.state || '',
        postcode: body.billing.postcode || '',
        country: body.billing.country,
        email: body.billing.email,
        phone: body.billing.phone || '',
      },
      shipping: {
        first_name: body.shipping?.first_name || body.billing.first_name,
        last_name: body.shipping?.last_name || body.billing.last_name,
        address_1: body.shipping?.address_1 || body.billing.address_1,
        address_2: body.shipping?.address_2 || '',
        city: body.shipping?.city || body.billing.city,
        state: body.shipping?.state || '',
        postcode: body.shipping?.postcode || '',
        country: body.shipping?.country || body.billing.country,
      },
      line_items: body.line_items.map(item => ({ product_id: item.product_id, quantity: item.quantity, ...(item.variation_id && { variation_id: item.variation_id }) })),
      customer_note: body.customer_note || '',
      payment_method: body.payment_method || 'cod',
      payment_method_title: getPaymentMethodTitle(body.payment_method || 'cod'),
      set_paid: false,
      status: 'pending',
    }

    // Optional shipping lines support
    if (Array.isArray(body.shipping_lines) && body.shipping_lines.length) {
      orderPayload.shipping_lines = body.shipping_lines.map((sl) => ({
        method_id: sl.method_id,
        method_title: sl.method_title || sl.title || 'Shipping',
        total: sl.total != null ? String(sl.total) : undefined,
      }))
    } else if (body.shipping_option?.id) {
      orderPayload.shipping_lines = [
        {
          method_id: body.shipping_option.id,
          method_title: body.shipping_option.title || 'Shipping',
          total: body.shipping_option.cost != null ? String(body.shipping_option.cost) : undefined,
        },
      ]
    }

    if (customerId) orderPayload.customer_id = customerId

    console.log("Order Payload:", orderPayload)
    const createdOrder = await wcFetch('orders', { method: 'POST', body: JSON.stringify(orderPayload) })

    const isDevelopment = process.env.NODE_ENV === 'development'
    let payUrl
    if (isDevelopment) {
      payUrl = `http://localhost:3000/order-success?order_id=${createdOrder.id}&order_key=${createdOrder.order_key}`
    } else {
      const siteBase = baseEnv.replace(/\/$/, '')
      payUrl = `${siteBase}/checkout/order-pay/${createdOrder.id}/?pay_for_order=true&key=${createdOrder.order_key}`
    }

    return NextResponse.json({ orderId: createdOrder.id, payUrl, orderKey: createdOrder.order_key, status: createdOrder.status, payment_method: createdOrder.payment_method })
  } catch (e) {
    const msg = e?.message || 'Order error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
