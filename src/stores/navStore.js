import { create } from 'zustand'

export const navStore = create((set) => ({
  isMenuDisplayed: false,
  setIsMenuDisplayed: (isMenuDisplayed) => set((state) => ({ ...state, isMenuDisplayed })),
}))
