import { Suspense } from 'react'
import SearchClient from './SearchClient'

export default function Page() {
  return (
    <Suspense fallback={<div className="py-8">Loading search…</div>}>
      <SearchClient />
    </Suspense>
  )
}
