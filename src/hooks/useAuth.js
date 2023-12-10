import { AUTH_STATUS, authStore } from '../stores/authStore'

export const useAuth = () => {
  const { setUser, setError, setStatus } = authStore((store) => store)
  const login = (user) => {
    setUser(user.uid, user.name, user.email, user.photoUrl)
    setError(null)
    setStatus(AUTH_STATUS.authorized)
  }
  const logout = (error) => {
    setUser(null, null, null, null)
    setError(error)
    setStatus(AUTH_STATUS.unauthorized)
  }
  return {
    login,
    logout
  }
}
