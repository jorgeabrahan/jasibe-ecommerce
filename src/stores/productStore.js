import { create } from 'zustand'

export const productStore = create((set) => ({
  categories: [],
  targetAudiences: [],
  products: [],
  recentProducts: [],
  setCategories: (categories) => set((state) => ({ ...state, categories })),
  setTargetAudiences: (targetAudiences) => set((state) => ({ ...state, targetAudiences })),
  setProducts: (products) => set(state => ({ ...state, products })),
  setRecentProducts: (recentProducts) => set(state => ({ ...state, recentProducts }))
}))
