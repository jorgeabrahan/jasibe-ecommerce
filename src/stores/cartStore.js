import { create } from 'zustand'

export const cartStore = create((set) => ({
  cart: [],
  setCartItem: (item, amount = 1) => set((state) => ({ ...state, cart: [...state.cart, { ...item, amount }] })),
  removeItem: (id) => set((state) => ({ ...state, cart: state.cart.filter(item => item.id !== id) })),
  setProductAmount: (id, newAmount) => set(state => ({ ...state, cart: state.cart.map(item => {
    if (item.id === id) return { ...item, amount: newAmount }
    return item
  })}))
}))
