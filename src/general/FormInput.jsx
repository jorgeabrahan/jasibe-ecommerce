import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

export const FormInput = ({
  label = '',
  id = '',
  value = '',
  type = 'text',
  isRequired = false,
  onInputChange = () => {}
}) => {
  const inputRef = useRef(null)
  const [passwordIcon, setPasswordIcon] = useState('visibility')
  const handleTogglePasswordVisibility = () => {
    if (inputRef.current === null) return
    if (passwordIcon === 'visibility') {
      setPasswordIcon('visibility_off')
      inputRef.current.type = 'text'
      return
    }
    setPasswordIcon('visibility')
    inputRef.current.type = 'password'
  }
  return (
    <div>
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          className="px-5 py-3 rounded-md border border-solid border-black/40 w-full focus:outline-none shadow-inner"
          autoComplete="off"
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onInputChange}
          required={isRequired}
          ref={inputRef}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-3 top-[50%] -translate-y-[50%] flex items-center"
            title={
              passwordIcon === 'visibility'
                ? 'Mostrar contraseña'
                : 'Ocultar contraseña'
            }
          >
            <span className="material-symbols-outlined">{passwordIcon}</span>
          </button>
        )}
      </div>
    </div>
  )
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onInputChange: PropTypes.func.isRequired
}
