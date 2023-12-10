import PropTypes from 'prop-types'
import { FormInput, PrimaryButton } from '../../general'
import { FormsLayout } from './FormsLayout'
import { useForm } from '../../hooks/useForm'
import { AUTH_STATUS, authStore } from '../../stores/authStore'
import { registerWithEmailAndPassword } from '../../firebase/providers'
import { useAuth } from '../../hooks'

export const RegisterForm = ({ setTabToShow = () => {} }) => {
  const { displayName, email, password, confirmPassword, onInputChange } = useForm({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { login, logout } = useAuth()
  const { error, status, setError, setStatus } = authStore((store) => store)
  const handleFormSubmit = (e) => {
    e.preventDefault()
    setError(null)
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      displayName.trim().length === 0 ||
      confirmPassword.trim().length === 0
    ) {
      setError('Debe llenar todos los campos')
      return
    }
    if (displayName.split(' ').length < 2) {
      setError('Ingresa por lo menos un nombre y un apellido')
      return
    }
    if (password.trim().length < 8) {
      setError('La contraseña debe tener un minimo de 8 caracteres')
      return
    }
    if (confirmPassword !== password) {
      setError('Las contraseñas no son iguales')
      return
    }
    setStatus(AUTH_STATUS.checking)
    registerWithEmailAndPassword({ email, password, displayName })
      .then((res) => {
        if (res?.ok) {
          login({
            uid: res?.uid,
            name: displayName,
            email,
            photoUrl: res?.photoURL
          })
          return
        }
        logout(res?.errorMessage)
      })
      .catch(() => {
        logout('No se pudo registrar esta cuenta')
      })
  }
  return (
    <FormsLayout
      title="Crear Cuenta"
      description="Crea tu propia cuenta para disfrutar de una experiencia más personalizada"
    >
      <form className="grid gap-3" onSubmit={handleFormSubmit}>
        <FormInput
          label="Nombre"
          value={displayName}
          id="displayName"
          type="text"
          onInputChange={onInputChange}
          isRequired={true}
        />
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
        <FormInput
          label="Confirmar contraseña"
          value={confirmPassword}
          id="confirmPassword"
          type="password"
          onInputChange={onInputChange}
          isRequired={true}
        />
        <p className={`text-slate-700 ${error !== null ? 'block' : 'hidden'}`}>
          {error}
        </p>
        <div className="flex gap-4 justify-end mt-3">
          <PrimaryButton
            disabled={status === AUTH_STATUS.checking}
            isWidthFull={true}
            type="submit"
          >
            Crear cuenta
          </PrimaryButton>
        </div>
      </form>
      {!(status === AUTH_STATUS.checking) && (
        <button
          onClick={() => {
            setTabToShow('login')
            setError(null)
          }}
          className="text-neutral-700 mx-auto block my-4"
        >
          ¿Ya tienes una cuenta?{' '}
          <span className="font-semibold text-steel-blue">Inicia sesion</span>
        </button>
      )}
    </FormsLayout>
  )
}

RegisterForm.propTypes = {
  setTabToShow: PropTypes.func.isRequired
}
