"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function OrderSuccessClient() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const orderKey = searchParams.get("order_key")
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!orderId) return
    setLoading(true)
    fetch(`/api/wc/orders/${orderId}?order_key=${orderKey || ""}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Order not found")
        return res.json()
      })
      .then(setOrder)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [orderId, orderKey])

  return (
    <div className="max-w-xl mx-auto py-16 px-4 text-center">
      <div className="flex justify-center mb-6">
        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
      {loading ? (
        <p className="text-gray-600">Loading order details...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : order ? (
        <>
          <p className="text-lg mb-4">Order <span className="font-mono">#{order.id}</span> was placed successfully.</p>
          <div className="bg-gray-50 rounded p-4 mb-4 text-left">
            <div className="mb-2"><span className="font-medium">Status:</span> <span className="capitalize">{order.status}</span></div>
            <div className="mb-2"><span className="font-medium">Total:</span> ${order.total}</div>
            <div className="mb-2"><span className="font-medium">Email:</span> {order.billing?.email}</div>
            <div className="mb-2"><span className="font-medium">Shipping:</span> {order.shipping?.address_1}, {order.shipping?.city}, {order.shipping?.country}</div>
          </div>
        </>
      ) : null}
      <Link href="/account/orders">
        <Button className="mt-4">View My Orders</Button>
      </Link>
      <Link href="/">
        <Button variant="outline" className="mt-2 ml-2">Continue Shopping</Button>
      </Link>
    </div>
  )
}
