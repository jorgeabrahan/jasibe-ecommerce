import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { FirebaseAuth } from './config'

const googleAuthProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleAuthProvider)
    const user = result?.user
    if (user === undefined)
      return {
        ok: false,
        errorMessage: 'User does not exist'
      }
    const { displayName, email, photoURL, uid } = user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (err) {
    const { message } = err
    return {
      ok: false,
      errorMessage: message
    }
  }
}

export const registerWithEmailAndPassword = async ({
  email,
  password,
  displayName
}) => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    )
    const { uid, photoURL } = resp.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (err) {
    let errorMessage = ''
    switch (err.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Ya existe una cuenta con este correo electrónico'
        break
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es correcto'
        break
      case 'auth/operation-not-allowed':
        errorMessage =
          'La autenticación por correo electrónico y contraseña no está habilitada'
        break
      case 'auth/weak-password':
        errorMessage = 'La contraseña es demasiado débil'
        break
      default:
        errorMessage = err.message
    }
    return {
      ok: false,
      errorMessage
    }
  }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, displayName, photoURL } = resp.user
    return {
      ok: true,
      uid,
      displayName,
      photoURL
    }
  } catch (err) {
    let errorMessage = ''
    switch (err.code) {
      case 'auth/invalid-email':
        errorMessage = 'El formato del correo electrónico no es correcto'
        break
      case 'auth/user-disabled':
        errorMessage = 'Este usuario ha sido deshabilitado'
        break
      case 'auth/user-not-found':
        errorMessage = 'No existe un usuario con este correo'
        break
      case 'auth/wrong-password':
        errorMessage = 'La contraseña es incorrecta'
        break
      case 'auth/too-many-requests':
        errorMessage =
          'Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo de nuevo más tarde'
        break
      case 'auth/network-request-failed':
        errorMessage =
          'Hubo un problema de red al intentar iniciar sesión. Por favor, verifica tu conexión a internet'
        break
      default:
        errorMessage = err.message
    }
    return {
      ok: false,
      errorMessage
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}
