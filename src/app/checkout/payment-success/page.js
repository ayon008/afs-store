"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function PaymentSuccessContent() {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
            <p>{error}</p>
          </div>
          <Link href="/shop">
            <Button>Return to Shop</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Your order has been received and is being processed.</p>
          </div>

          {/* Order Details */}
          {order && (
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">#{order.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(order.date_created).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium capitalize">{order.status}</span>
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

              {/* Order Items */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.line_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€{item.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You will receive an order confirmation email shortly</li>
                <li>• Our team will process your order within 1-2 business days</li>
                <li>• You&apos;ll receive a shipping notification with tracking information</li>
                <li>• You can track your order status in your account</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full sm:w-auto">
                  View Order Details
                </Button>
              </Link>
              <Link href="/shop">
                <Button className="w-full sm:w-auto">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  )
}