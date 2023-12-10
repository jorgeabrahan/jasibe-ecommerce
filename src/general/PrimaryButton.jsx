import PropTypes from 'prop-types'

export const PrimaryButton = ({
  handleOnClick = () => {},
  isWidthFull = false,
  className = '',
  type = 'button',
  disabled = false,
  children
}) => {
  return (
    <>
      <button
        className={`block px-5 py-2 rounded-md shadow-sm font-semibold text-white bg-steel-blue shadow-steel-blue ${
          isWidthFull ? 'w-full' : 'w-max'
        } ${className}`}
        style={{
          opacity: disabled ? '0.4' : '1',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
        onClick={handleOnClick}
        type={type}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  )
}

PrimaryButton.propTypes = {
  handleOnClick: PropTypes.func,
  isWidthFull: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}
