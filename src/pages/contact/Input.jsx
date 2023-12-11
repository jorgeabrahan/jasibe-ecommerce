import PropTypes from 'prop-types'

export const Input = ({ id = '', text = '', type = 'text', inputRef = null, isRequired = true }) => {
  return (
    <div className="relative">
      <label
        className="absolute -top-3 left-7 text-xs text-davys-gray p-1 bg-white z-10"
        htmlFor={id}
      >{text}</label>
      <input
        className="border border-solid border-davys-gray-500 rounded-[30px] w-full px-5 py-3"
        type={type}
        id={id}
        name={id}
        autoComplete="off"
        required={isRequired}
        ref={inputRef}
      />
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
}
