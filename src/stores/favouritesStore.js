import { create } from 'zustand'

export const favouritesStore = create((set) => ({
  favourites: [],
  setFavouritesItem: (item) =>
    set((state) => ({ ...state, favourites: [...state.favourites, item] })),
  removeFromFavourites: (itemId) =>
    set((state) => ({
      ...state,
      favourites: state.favourites.filter((item) => item.id !== itemId)
    }))
}))
