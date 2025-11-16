"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProjectCard from '@/components/ProjectCard'
import Container from '@/components/Container'

export default function SearchClient() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''

  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!q) {
      setProducts([])
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/search?q=${encodeURIComponent(q)}&per_page=24`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data?.data) setProducts(data.data)
        else setError(data?.error || 'Unexpected response')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message || String(err))
      })
      .finally(() => !cancelled && setLoading(false))

    return () => { cancelled = true }
  }, [q])

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-extrabold mb-4">Search results for &quot;{q}&quot;</h1>

        {loading && <p>Loading…</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>No products found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((p) => (
            <ProjectCard
              key={p.id}
              name={p.name}
              image={(p.images && p.images[0]?.src) || p.image || ''}
              hoverImage={(p.images && p.images[1]?.src) || null}
              link={`/product/${p.slug || p.id}`}
              price={p.price ? `${p.price} ${p.currency || ''}` : p.price_html || ''}
              bestseller={p?.tags?.find(t => t.name?.toLowerCase().includes('bestseller'))?.name || null}
            />
          ))}
        </div>
      </div>
    </Container>
  )
}
