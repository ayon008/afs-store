import { NextResponse } from 'next/server'
import { wcFetchWithMeta } from '@/lib/wc.server'

/**
 * GET /api/search?q=term&page=1&per_page=12
 * - queries WooCommerce products endpoint using wcFetchWithMeta
 * - returns { data: [...products], total, totalPages }
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || searchParams.get('search') || '').trim()
    const page = Number(searchParams.get('page') || 1)
    const per_page = Number(searchParams.get('per_page') || 12)

    if (!q) {
      return NextResponse.json({ data: [], total: 0, totalPages: 0 })
    }

    // Call WooCommerce products endpoint with search param
    const { data, total, totalPages } = await wcFetchWithMeta('products', {
      searchParams: {
        search: q,
        page: Math.max(1, page),
        per_page: Math.min(100, Math.max(1, per_page)),
      },
    })

    return NextResponse.json({ data, total, totalPages })
  } catch (err) {
    console.error('[api/search] error', err)
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
