import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const NavLink = ({ to = '', tooltip = '', children }) => {
  return (
    <div className="relative group">
      <Link
        className="block p-4 rounded-full bg-off-red/60 backdrop-blur-md border border-solid border-off-red w-max"
        to={to}
      >
        {children}
      </Link>
      <span className="absolute top-[50%] -translate-y-[50%] right-[calc(100%+0.5rem)] hidden group-hover:block transition-opacity font-cursive text-xl w-max bg-white/80 p-1 rounded-xl">
        {tooltip}
      </span>
    </div>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
