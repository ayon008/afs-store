"use client"

import useSWR from "swr"

const fetcher = (url) =>
  fetch(url, { credentials: "include" }).then(async (r) => {
    if (r.status === 401) {
      const errorData = await r.json().catch(() => ({ message: "Unauthorized" }))
      throw new Error(errorData.message || "Unauthorized")
    }
    if (!r.ok) {
      const error = await r.json().catch(() => ({ message: "Request failed" }))
      throw new Error(error.message || "Request failed")
    }
    return r.json()
  })

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR("/api/auth/me", fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.message === "Unauthorized") {
        return
      }
      if (retryCount >= 3) {
        return
      }
      setTimeout(() => revalidate({ retryCount }), Math.min(1000 * 2 ** retryCount, 30000))
    },
    shouldRetryOnError: (error) => {
      return error.message !== "Unauthorized"
    }
  })
  const user = data

  async function login(username, password) {
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
    if (!r.ok) {
      const j = await r.json().catch(() => ({}))
      throw new Error(j?.message || "Login failed")
    }
    await mutate()
  }

  async function signup(data) {
    const r = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
    if (!r.ok) {
      const j = await r.json().catch(() => ({}))
      throw new Error(j?.message || "Registration failed")
    }
    await mutate()
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    await mutate(undefined, { revalidate: false })
  }

  return { user, isLoading, error, login, signup, logout }
}

