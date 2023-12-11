import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const SecondaryLink = ({
  to = '',
  children = null,
  isWidthFull = false,
  disabled = false,
  className = ''
}) => {
  return (
    <Link
      to={to}
      className={`block px-5 py-2 rounded-md shadow-sm font-semibold text-white bg-gray-700/80 shadow-gray-700 ${
        isWidthFull ? 'w-full' : 'w-max'
      } ${className}`}
      style={{
        opacity: disabled ? '0.4' : '1',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {children}
    </Link>
  )
}

SecondaryLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
  isWidthFull: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string
}
