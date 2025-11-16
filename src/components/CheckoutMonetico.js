"use client"

import { useState, useRef } from 'react'

export default function CheckoutMonetico({ 
  cartData, 
  customerData, 
  onSuccess, 
  onError,
  disabled = false 
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const formRef = useRef(null)

  const initiatePayment = async () => {
    if (disabled) return
    
    setLoading(true)
    setError(null)

    try {
      // First create a WooCommerce order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          billing: customerData.billing,
          shipping: customerData.shipping || customerData.billing,
          line_items: cartData.lineItems,
          shipping_lines: cartData.shippingLines || [],
          payment_method: 'monetico',
          payment_method_title: 'Monetico Payment Gateway'
        })
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()
      const orderId = orderData.orderId

      // Initialize Monetico payment
      const paymentResponse = await fetch('/api/payments/monetico/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerData,
          cartData
        })
      })

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json()
        throw new Error(errorData.error || 'Failed to initiate payment')
      }

      const paymentData = await paymentResponse.json()

      // Create and submit the form to redirect to Monetico
      createAndSubmitForm(paymentData.paymentData, paymentData.actionUrl)

    } catch (err) {
      console.error('Monetico payment error:', err)
      setError(err.message)
      if (onError) onError(err)
    } finally {
      setLoading(false)
    }
  }

  const createAndSubmitForm = (formData, actionUrl) => {
    // Remove any existing hidden form
    const existingForm = document.getElementById('monetico-payment-form')
    if (existingForm) {
      existingForm.remove()
    }

    // Create a hidden form for Monetico payment
    const form = document.createElement('form')
    form.id = 'monetico-payment-form'
    form.method = 'POST'
    form.action = actionUrl
    form.style.display = 'none'

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = value
      form.appendChild(input)
    })

    // Add form to document and submit
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <div className="monetico-payment-wrapper">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <button
        onClick={initiatePayment}
        disabled={disabled || loading}
        className={`w-full py-3 px-4 rounded font-medium transition-colors ${
          disabled || loading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          'Pay with Bank Transfer'
        )}
      </button>

      <div className="mt-3 text-xs text-gray-600 text-center">
        <p>You will be redirected to a secure payment page</p>
        <p>Powered by Monetico Payment</p>
      </div>

      {/* Hidden form reference for cleanup */}
      <form ref={formRef} style={{ display: 'none' }}></form>
    </div>
  )
}