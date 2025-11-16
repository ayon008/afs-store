"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function PaymentErrorContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const orderId = searchParams.get('order_id')

  useEffect(() => {
    if (!orderId) {
      setError('No order ID provided')
      setLoading(false)
      return
    }

    // Fetch order details
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`)
        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
        } else {
          setError('Failed to load order details')
        }
      } catch (err) {
        setError('Failed to load order details')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId])

  const handleRetryPayment = () => {
    if (orderId) {
      // Redirect back to checkout with order information
      router.push(`/checkout?retry_order=${orderId}`)
    } else {
      router.push('/checkout')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Error Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-gray-600">Unfortunately, your payment could not be processed.</p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-red-800 mb-2">What went wrong?</h3>
            <div className="text-sm text-red-700 space-y-1">
              <p>• Your payment was declined or canceled</p>
              <p>• The payment session may have expired</p>
              <p>• There might be an issue with your payment method</p>
              <p>• Network connectivity issues during payment processing</p>
            </div>
          </div>

          {/* Order Details */}
          {order && (
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">#{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium text-red-600 capitalize">{order.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-bold text-lg">€{order.total}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Billing Address</h3>
                  <div className="text-sm text-gray-600">
                    <p>{order.billing?.first_name} {order.billing?.last_name}</p>
                    <p>{order.billing?.address_1}</p>
                    {order.billing?.address_2 && <p>{order.billing.address_2}</p>}
                    <p>{order.billing?.postcode} {order.billing?.city}</p>
                    <p>{order.billing?.country}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What you can do:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Try the payment again with the same or different payment method</li>
                <li>• Check your payment method details and ensure sufficient funds</li>
                <li>• Contact your bank if you continue to experience issues</li>
                <li>• Reach out to our customer support for assistance</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleRetryPayment}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Payment
              </Button>
              
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto">
                  Contact Support
                </Button>
              </Link>
              
              <Link href="/shop">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Preservation Notice */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Don&apos;t worry!</strong> Your order information has been saved. 
              You can retry the payment or contact us for assistance. 
              Your items will remain reserved for a limited time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      }
    >
      <PaymentErrorContent />
    </Suspense>
  )
}