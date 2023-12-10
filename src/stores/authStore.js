import { create } from 'zustand'

export const AUTH_STATUS = {
    checking: 'checking',
    unauthorized: 'unauthorized',
    authorized: 'authorized'
}

export const authStore = create((set) => ({
  user: { uid: '', name: '', email: '', photoUrl: '' },
  status: 'unauthorized',
  error: null,
  setUser: (uid, name, email, photoUrl) => set((state) => ({ ...state, user: { uid, name, email, photoUrl } })),
  setStatus: (status) => set((state) => ({ ...state, status })),
  setError: (error) => set((state) => ({ ...state, error })),
}))
