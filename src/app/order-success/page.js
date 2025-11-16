import React, { Suspense } from 'react'
import OrderSuccessClient from './OrderSuccessClient'

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-xl mx-auto py-16 px-4 text-center">Loading…</div>}>
      <OrderSuccessClient />
    </Suspense>
  )
}
