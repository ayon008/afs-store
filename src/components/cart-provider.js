"use client"

import React from "react"

const CartContext = React.createContext(null)
const STORAGE_KEY = "cart_v1"

function useLocalStorageCart() {
  const [state, setState] = React.useState({ items: [] })
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setState(JSON.parse(raw))
    } catch {}
  }, [])
  const set = (s) => {
    setState(s)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    } catch {}
  }
  return [state, set]
}

export function CartProvider({ children }) {
  const [state, setState] = useLocalStorageCart()

  const addItem = React.useCallback(
    (item, qty = 1) => {
      setState({
        items: (() => {
          const exists = state.items.find((i) => i.productId === item.productId)
          if (exists) {
            return state.items.map((i) => (i.productId === item.productId ? { ...i, quantity: i.quantity + qty } : i))
          }
          return [...state.items, { ...item, quantity: qty }]
        })(),
      })
    },
    [setState, state.items],
  )

  const updateQty = React.useCallback(
    (productId, qty) => {
      setState({
        items: state.items
          .map((i) => (i.productId === productId ? { ...i, quantity: qty } : i))
          .filter((i) => i.quantity > 0),
      })
    },
    [setState, state.items],
  )

  const removeItem = React.useCallback(
    (productId) => {
      setState({ items: state.items.filter((i) => i.productId !== productId) })
    },
    [setState, state.items],
  )

  const clear = React.useCallback(() => setState({ items: [] }), [setState])

  const totalQty = state.items.reduce((a, b) => a + b.quantity, 0)
  const totalPrice = state.items.reduce((a, b) => a + b.price * b.quantity, 0)

  const value = {
    items: state.items,
    totalQty,
    totalPrice,
    addItem,
    updateQty,
    removeItem,
    clear,
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
