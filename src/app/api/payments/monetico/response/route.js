import { NextResponse } from 'next/server'
import { createMoneticoClient, convertMoneticoFormData, logMoneticoResponse } from '@/lib/monetico'
import { wcFetch } from '@/lib/wc.server'
import { getMoneticoConfig, validateMoneticoConfig, logMoneticoConfig } from '@/lib/monetico-config'

export async function POST(req) {
  try {
    // Parse the form data from Monetico using improved conversion
    const formData = await req.formData()
    const responseData = convertMoneticoFormData(formData)

    console.log('Received Monetico response - Raw FormData entries:')
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}: ${value}`)
    }

    // Log response data for debugging
    logMoneticoResponse(responseData, 'Received')

    // Configure Monetico client using centralized config (same as initiate)
    const moneticoConfig = getMoneticoConfig()
    
    // Validate configuration
    try {
      validateMoneticoConfig(moneticoConfig)
    } catch (error) {
      console.error('Invalid Monetico configuration in response:', error.message)
      return new Response('version=2\ncdr=1\n', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Log config for debugging (without sensitive data)
    logMoneticoConfig(moneticoConfig, 'Response')

    const monetico = createMoneticoClient(moneticoConfig)

    // Verify MAC to ensure the response is authentic
    console.log('=== MAC Verification Debug ===')
    console.log('Config used for verification:', {
      tpe: moneticoConfig.tpe,
      company: moneticoConfig.company,
      environment: moneticoConfig.environment,
      hasKey: !!moneticoConfig.key,
      keyLength: moneticoConfig.key ? moneticoConfig.key.length : 0
    })

    const isValidMac = monetico.verifyResponseMac({ ...responseData })
    
    if (!isValidMac) {
      console.error('=== MAC VERIFICATION FAILED ===')
      console.error('This indicates either:')
      console.error('1. Configuration mismatch between initiate and response')
      console.error('2. Secret key is incorrect')
      console.error('3. Field encoding/ordering issue')
      console.error('4. Monetico sent corrupted data')
      
      // Return error response to Monetico
      const errorResponse = monetico.createConfirmationResponse(false)
      return new Response(errorResponse.response, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    console.log('=== MAC VERIFICATION SUCCESS ===')
    console.log('Response is authentic from Monetico')

    // Parse payment response
    const paymentResult = monetico.parseResponse(responseData)
    
    // Extract order ID from reference (format: ORDER-123)
    const reference = responseData.reference || ''
    const orderIdMatch = reference.match(/ORDER-(\d+)/)
    
    if (!orderIdMatch) {
      console.error('Invalid order reference format:', reference)
      const errorResponse = monetico.createConfirmationResponse(false)
      return new Response(errorResponse.response, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    const orderId = orderIdMatch[1]

    try {
      // Get the order from WooCommerce
      const order = await wcFetch(`orders/${orderId}`)
      
      // Determine new order status based on payment result
      let newStatus = 'failed'
      let statusNote = 'Payment failed via Monetico'
      
      if (paymentResult.isSuccess) {
        newStatus = 'processing'
        statusNote = `Payment completed via Monetico. Transaction ID: ${paymentResult.authorizationNumber || paymentResult.transactionId}`
      } else {
        statusNote = `Payment failed via Monetico. Return code: ${paymentResult.returnCode}`
      }

      // Update order status and add payment details
      const updateData = {
        status: newStatus,
        meta_data: [
          ...(order.meta_data || []),
          {
            key: '_monetico_transaction_id',
            value: paymentResult.authorizationNumber || paymentResult.transactionId || ''
          },
          {
            key: '_monetico_return_code',
            value: paymentResult.returnCode || ''
          },
          {
            key: '_monetico_amount',
            value: paymentResult.amount || ''
          },
          {
            key: '_monetico_payment_date',
            value: paymentResult.date || ''
          },
          {
            key: '_monetico_response_processed',
            value: new Date().toISOString()
          }
        ]
      }

      // If payment successful, mark as paid
      if (paymentResult.isSuccess) {
        updateData.set_paid = true
        updateData.transaction_id = paymentResult.authorizationNumber || paymentResult.transactionId
      }

      // Update the order
      await wcFetch(`orders/${orderId}`, {
        method: 'PUT',
        body: JSON.stringify(updateData)
      })

      // Add order note
      await wcFetch(`orders/${orderId}/notes`, {
        method: 'POST',
        body: JSON.stringify({
          note: statusNote,
          customer_note: false
        })
      })

      console.log('Order updated successfully:', {
        orderId,
        newStatus,
        transactionId: paymentResult.authorizationNumber || paymentResult.transactionId,
        isSuccess: paymentResult.isSuccess
      })

      // Send confirmation response to Monetico
      const confirmationResponse = monetico.createConfirmationResponse(true)
      return new Response(confirmationResponse.response, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })

    } catch (orderError) {
      console.error('Failed to update order:', orderError)
      
      // Even if we can't update the order, we should still confirm receipt
      // to prevent Monetico from retrying
      const confirmationResponse = monetico.createConfirmationResponse(false)
      return new Response(confirmationResponse.response, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

  } catch (error) {
    console.error('Monetico response handler error:', error)
    
    // Return error response to Monetico
    return new Response('version=2\ncdr=1\n', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

// Handle GET requests (for testing purposes)
export async function GET(req) {
  return NextResponse.json({ 
    message: 'Monetico response endpoint is working',
    timestamp: new Date().toISOString()
  })
}