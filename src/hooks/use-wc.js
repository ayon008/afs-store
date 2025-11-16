"use client"

import useSWR from "swr"

const fetcher = (url) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Request failed")
    return r.json()
  })

export function useCategories() {
  const { data, error, isLoading } = useSWR("/api/wc/categories", fetcher)
  return { categories: data || undefined, error, isLoading }
}

export function useProducts(params) {
  const sp = new URLSearchParams()
  if (params?.category) sp.set("category", String(params.category))
  if (params?.search) sp.set("search", String(params.search))
  if (params?.page) sp.set("page", String(params.page))
  if (params?.per_page) sp.set("per_page", String(params.per_page))
  const key = `/api/wc/products${sp.toString() ? `?${sp.toString()}` : ""}`
  const { data, error, isLoading } = useSWR(key, fetcher)
  return { products: data || undefined, error, isLoading }
}

export function useProduct(id) {
  const key = id ? `/api/wc/products/${id}` : null
  const { data, error, isLoading } = useSWR(key, fetcher)
  return { product: data || undefined, error, isLoading }
}

export function useProductHandle(handle) {
  const key = handle ? `/api/wc/products/by-handle?handle=${encodeURIComponent(handle)}` : null
  const { data, error, isLoading } = useSWR(key, fetcher)
  return { product: data || undefined, error, isLoading }
}
