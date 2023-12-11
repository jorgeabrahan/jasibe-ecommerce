import { create } from 'zustand'

export const cartStore = create((set) => ({
  cart: [],
  setCartItem: (item) => set((state) => ({ ...state, cart: [...state.cart, item] })),
  removeItem: (id) => set((state) => ({ ...state, cart: state.cart.filter(item => item.id !== id) }))
}))
