import { create } from 'zustand'

export const historyStore = create((set) => ({
  history: [],
  addHistoryItem: (product) => set((state) => {
    const itemFound = state.history.find(item => item.id === product.id)
    // el producto solo se agrega si no estaba agregado anteriormente
    if (itemFound === undefined) return { ...state, history: [...state.history, product] }
    // de lo contrario no se hace nada
    return state
  })
}))
