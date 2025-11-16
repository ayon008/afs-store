"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SingleOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()
  const { user, isLoading } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // prefer route param `id` (from URL /account/orders/[id]) but support query order_key
  const orderId = params?.id || searchParams.get('order_id')
  const orderKey = searchParams.get('order_key')

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [isLoading, user, router])

  useEffect(() => {
    if (!user || !orderId) return
    
    let mounted = true
    setLoading(true)
    
    ;(async () => {
      try {
        const url = orderKey 
          ? `/api/orders/${orderId}?order_key=${orderKey}`
          : `/api/orders/${orderId}`
        const res = await fetch(url, { credentials: 'include' })
        
        if (!mounted) return
        
        if (res.ok) {
          const orderData = await res.json()
          setOrder(orderData)
        } else {
          const errorData = await res.json().catch(() => ({}))
          setError(errorData.error || 'Failed to load order details')
        }
      } catch (e) {
        if (!mounted) return
        setError('Network error')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    
    return () => { mounted = false }
  }, [user, orderId, orderKey])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'processing': return 'text-blue-600 bg-blue-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      case 'refunded': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  // --- Improved UI + skeletons while preserving functionality & colors ---
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="h-4 w-40 rounded bg-gray-200 animate-pulse"></div>

          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-8 w-56 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
            </div>
            <div className="h-8 w-28 rounded-full bg-gray-200 animate-pulse"></div>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="h-6 w-40 rounded bg-gray-200 animate-pulse mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0,1,2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-36 rounded bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200 animate-pulse"></div>
                    <div className="h-3 w-5/6 rounded bg-gray-200 animate-pulse"></div>
                    <div className="h-3 w-3/4 rounded bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <div className="h-6 w-40 rounded bg-gray-200 animate-pulse mb-4"></div>
            <div className="hidden md:block">
              <div className="space-y-4">
                {[0,1,2].map((r) => (
                  <div key={r} className="flex justify-between items-center">
                    <div className="h-4 w-56 rounded bg-gray-200 animate-pulse"></div>
                    <div className="h-4 w-24 rounded bg-gray-200 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:hidden space-y-4">
              {[0,1,2].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="space-y-2 max-w-sm ml-auto">
                <div className="h-4 w-32 rounded bg-gray-200 animate-pulse ml-auto"></div>
                <div className="h-4 w-24 rounded bg-gray-200 animate-pulse ml-auto"></div>
                <div className="h-6 w-40 rounded bg-gray-200 animate-pulse ml-auto"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-10 w-full sm:w-48 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-10 w-full sm:w-48 rounded bg-gray-200 animate-pulse"></div>
            <div className="h-10 w-full sm:w-48 rounded bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-red-600 mb-4">{error}</div>
        <Link href="/account/orders">
          <Button variant="outline">← Back to Orders</Button>
        </Link>
      </div>
    </div>
  )
  
  if (!order) return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">Order not found.</div>
        <Link href="/account/orders">
          <Button variant="outline">← Back to Orders</Button>
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-600 mb-4 items-center">
          <Link href="/account/orders" className="hover:text-gray-900">
            Orders
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Order #{order.id}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Order #{order.id}</h1>
            <p className="text-gray-600">Placed on {formatDate(order.date_created)}</p>
          </div>
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Order Summary - aligned fields */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Order Details */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Order Details</h3>
              <dl className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order ID:</dt>
                  <dd className="font-medium">#{order.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Order Key:</dt>
                  <dd className="font-medium break-all">{order.order_key}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Date:</dt>
                  <dd className="font-medium">{formatDate(order.date_created)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Payment Method:</dt>
                  <dd className="font-medium">{order.payment_method_title || 'N/A'}</dd>
                </div>
              </dl>
            </div>

            {/* Billing Address */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Billing Address</h3>
              <div className="text-sm text-gray-700 space-y-1">
                <div className="font-medium">{order.billing?.first_name} {order.billing?.last_name}</div>
                <div>{order.billing?.address_1}</div>
                {order.billing?.address_2 && <div>{order.billing.address_2}</div>}
                <div>{order.billing?.city}{order.billing?.state ? `, ${order.billing.state}` : ''} {order.billing?.postcode}</div>
                <div>{order.billing?.country}</div>
                <div className="mt-2 text-sm text-gray-600">{order.billing?.email}</div>
                {order.billing?.phone && <div className="text-sm text-gray-600">{order.billing.phone}</div>}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
              <div className="text-sm text-gray-700 space-y-1">
                {order.shipping && Object.keys(order.shipping).length > 0 ? (
                  <>
                    <div className="font-medium">{order.shipping.first_name} {order.shipping.last_name}</div>
                    <div>{order.shipping.address_1}</div>
                    {order.shipping.address_2 && <div>{order.shipping.address_2}</div>}
                    <div>{order.shipping.city}{order.shipping.state ? `, ${order.shipping.state}` : ''} {order.shipping.postcode}</div>
                    <div>{order.shipping.country}</div>
                  </>
                ) : (
                  <div className="text-sm text-gray-600">Same as billing address</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Product</th>
                  <th className="py-2 text-center">Quantity</th>
                  <th className="py-2 text-right">Price</th>
                  <th className="py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.line_items?.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors align-top">
                    <td className="py-4 align-top">
                      <div className="flex flex-col">
                        <div className="font-medium">{item.name}</div>
                        {item.meta_data && item.meta_data.length > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            {item.meta_data.map((meta, index) => (
                              <div key={index} className="leading-tight">{meta.display_key}: {meta.display_value}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-center align-middle">{item.quantity}</td>
                    <td className="py-4 text-right align-middle">${parseFloat(item.price || 0).toFixed(2)}</td>
                    <td className="py-4 text-right font-medium align-middle">${parseFloat(item.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - improved alignment */}
          <div className="md:hidden space-y-4">
            {order.line_items?.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="font-medium text-sm">{item.name}</div>
                    {item.meta_data && item.meta_data.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        {item.meta_data.map((meta, index) => (
                          <div key={index} className="leading-tight">{meta.display_key}: {meta.display_value}</div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${parseFloat(item.total).toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    <div className="text-sm text-gray-600">Price: ${parseFloat(item.price || 0).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals - right aligned box */}
          <div className="mt-6 border-t pt-4">
            <div className="max-w-sm ml-auto">
              <div className="flex justify-between py-1 text-sm">
                <span>Subtotal:</span>
                <span className="font-medium">${parseFloat(
                  (order.total || 0) - 
                  (order.total_tax || 0) - 
                  (order.shipping_total || 0)
                ).toFixed(2)}</span>
              </div>
              {parseFloat(order.shipping_total || 0) > 0 && (
                <div className="flex justify-between py-1 text-sm">
                  <span>Shipping:</span>
                  <span>${parseFloat(order.shipping_total).toFixed(2)}</span>
                </div>
              )}
              {parseFloat(order.total_tax || 0) > 0 && (
                <div className="flex justify-between py-1 text-sm">
                  <span>Tax:</span>
                  <span>${parseFloat(order.total_tax).toFixed(2)}</span>
                </div>
              )}
              {parseFloat(order.discount_total || 0) > 0 && (
                <div className="flex justify-between py-1 text-sm text-green-600">
                  <span>Discount:</span>
                  <span>-${parseFloat(order.discount_total).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span>${parseFloat(order.total || 0).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Notes */}
        {order.customer_note && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Customer Notes</h2>
            <p className="text-gray-700">{order.customer_note}</p>
          </div>
        )}

        {/* Order Notes/Status History */}
        {order.meta_data && order.meta_data.length > 0 && (
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Order Notes</h2>
            <div className="space-y-2 text-sm text-gray-700">
              {order.meta_data
                .filter(meta => meta.key && meta.value && !meta.key.startsWith('_'))
                .map((meta, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium mr-4">{meta.key}:</span>
                    <span className="truncate">{String(meta.value)}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/account/orders">
            <Button variant="outline" className="w-full sm:w-auto">← Back to Orders</Button>
          </Link>
          
          {order.status === 'pending' && (
            <Link href={`/checkout/order-pay/${order.id}/?pay_for_order=true&key=${order.order_key}`}>
              <Button className="w-full sm:w-auto">Pay Now</Button>
            </Link>
          )}
          
          {(order.status === 'completed' || order.status === 'processing') && (
            <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto">
              Print Order
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
