import { NextResponse } from 'next/server'
import { createMoneticoClient } from '@/lib/monetico'
import { wcFetch } from '@/lib/wc.server'
import { getMoneticoConfig, validateMoneticoConfig, logMoneticoConfig } from '@/lib/monetico-config'

export async function POST(req) {
  try {
    const body = await req.json()
    const { orderId, customerData, cartData } = body

    // Validate required data
    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    if (!customerData?.billing?.email) {
      return NextResponse.json({ error: 'Customer email is required' }, { status: 400 })
    }

    // Get order details from WooCommerce
    let order
    try {
      order = await wcFetch(`orders/${orderId}`)
    } catch (error) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Validate order status (should be pending)
    if (order.status !== 'pending') {
      return NextResponse.json({ 
        error: 'Order is not in pending status', 
        status: order.status 
      }, { status: 400 })
    }

    // Configure Monetico client using centralized config
    const moneticoConfig = getMoneticoConfig(orderId)
    
    // Validate configuration
    try {
      validateMoneticoConfig(moneticoConfig)
    } catch (error) {
      console.error('Invalid Monetico configuration:', error.message)
      return NextResponse.json({ 
        error: 'Monetico configuration is incomplete',
        details: error.message 
      }, { status: 500 })
    }

    // Log config for debugging (without sensitive data)
    logMoneticoConfig(moneticoConfig, 'Initiate')

    const monetico = createMoneticoClient(moneticoConfig)

    // Prepare payment data
    const paymentData = monetico.createPaymentData({
      amount: order.total,
      reference: `ORDER-${order.id}`,
      customerEmail: customerData.billing.email,
      description: `Order #${order.id} - AFS Foiling`,
      customerData: {
        firstName: customerData.billing.first_name,
        lastName: customerData.billing.last_name,
        address: customerData.billing.address_1,
        city: customerData.billing.city,
        postcode: customerData.billing.postcode,
        country: customerData.billing.country
      }
    })

    // Update order to mark it as processing monetico payment
    try {
      await wcFetch(`orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify({
          status: 'pending',
          payment_method: 'monetico',
          payment_method_title: 'Monetico Payment Gateway',
          meta_data: [
            {
              key: '_monetico_payment_initiated',
              value: 'yes'
            },
            {
              key: '_monetico_reference',
              value: `ORDER-${order.id}`
            }
          ]
        })
      })
    } catch (error) {
      console.error('Failed to update order with Monetico data:', error)
      // Continue anyway, as the payment can still proceed
    }

    console.log('Monetico payment initiated for order:', {
      orderId: order.id,
      amount: order.total,
      reference: `ORDER-${order.id}`,
      email: customerData.billing.email
    })

    return NextResponse.json({
      success: true,
      paymentData: paymentData.formData,
      actionUrl: paymentData.actionUrl,
      orderId: order.id
    })

  } catch (error) {
    console.error('Monetico payment initiation error:', error)
    return NextResponse.json({ 
      error: 'Failed to initiate payment',
      details: error.message 
    }, { status: 500 })
  }
}