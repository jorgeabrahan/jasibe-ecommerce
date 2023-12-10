import PropTypes from 'prop-types'
import { FormInput, PrimaryButton } from '../../general'
import { FormsLayout } from './FormsLayout'
import { Google } from '../../assets/icons'
import {
  loginWithEmailAndPassword,
  signInWithGoogle
} from '../../firebase/providers'
import { AUTH_STATUS, authStore } from '../../stores/authStore'
import { useForm, useAuth } from '../../hooks'

export const LoginForm = ({ setTabToShow }) => {
  const { error, status, setStatus, setError } = authStore((store) => store)
  const { login, logout } = useAuth()
  const { email, password, onInputChange, formState } = useForm({
    email: '',
    password: ''
  })
  const handleFormSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (email.trim().length === 0 || password.trim().length === 0) {
      setError('Debe llenar todos los campos')
      return
    }
    if (password.trim().length < 8) {
      setError('La contraseña debe tener un minimo de 8 caracteres')
      return
    }
    setStatus(AUTH_STATUS.checking)
    loginWithEmailAndPassword(formState)
      .then((res) => {
        if (res?.ok) {
          login({
            uid: res?.uid,
            name: res?.displayName,
            email,
            photoUrl: res?.photoURL
          })
          return
        }
        logout(res?.errorMessage)
      })
      .catch('No se pudo iniciar sesion')
  }
  const handleGoogleSignIn = () => {
    setStatus(AUTH_STATUS.checking)
    setError(null)
    signInWithGoogle()
      .then((res) => {
        if (res?.ok) {
          login({
            uid: res?.uid,
            name: res?.displayName,
            email: res?.email,
            photoUrl: res?.photoURL
          })
          return
        }
        logout(res?.errorMessage)
      })
      .catch(() => {
        logout('No se pudo autenticar mediante Google')
      })
  }
  return (
    <FormsLayout
      title="Iniciar Sesión"
      description="Accede a tu cuenta para brindarte una experiencia mas personalizada"
    >
      <form className="grid gap-3" onSubmit={handleFormSubmit}>
        <FormInput
          label="Correo"
          value={email}
          id="email"
          type="email"
          onInputChange={onInputChange}
          isRequired={true}
        />
        <FormInput
          label="Contraseña"
          value={password}
          id="password"
          type="password"
          onInputChange={onInputChange}
          isRequired={true}
        />
        <p className={`text-slate-700 ${error !== null ? 'block' : 'hidden'}`}>
          {error}
        </p>
        <div className="grid gap-3 mt-3">
          <PrimaryButton
            disabled={status === AUTH_STATUS.checking}
            isWidthFull={true}
            type="submit"
          >
            Iniciar sesión
          </PrimaryButton>
          <button
            onClick={handleGoogleSignIn}
            className="flex gap-3 items-center justify-center px-5 py-2 font-semibold border border-solid border-black/40 rounded-md bg-white"
            style={{
              opacity: status === AUTH_STATUS.checking ? '0.4' : '1',
              cursor:
                status === AUTH_STATUS.checking ? 'not-allowed' : 'pointer'
            }}
            type="button"
            disabled={status === AUTH_STATUS.checking}
          >
            <Google />
            Iniciar sesión con Google
          </button>
        </div>
      </form>
      {!(status === AUTH_STATUS.checking) && (
        <button
          onClick={() => {
            setTabToShow('registry')
            setError(null)
          }}
          className="text-neutral-700 mx-auto block my-4"
        >
          ¿No tienes una cuenta?{' '}
          <span className="font-semibold text-steel-blue">Registrate</span>
        </button>
      )}
    </FormsLayout>
  )
}

LoginForm.propTypes = {
  setTabToShow: PropTypes.func.isRequired
}
