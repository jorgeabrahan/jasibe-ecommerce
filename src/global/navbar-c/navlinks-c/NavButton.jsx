import PropTypes from 'prop-types'
export const NavButton = ({ tooltip = '', handleOnClick = () => {}, children }) => {
  return (
    <div className="relative group">
      <button
        className="block p-4 rounded-full bg-off-red/60 border border-solid border-off-red w-max"
        onClick={handleOnClick}
      >
        {children}
      </button>
      <span className="absolute top-[50%] -translate-y-[50%] right-[calc(100%+0.5rem)] hidden group-hover:block transition-opacity font-cursive text-xl w-max">
        {tooltip}
      </span>
    </div>
  );
}

NavButton.propTypes = {
    tooltip: PropTypes.string.isRequired,
    handleOnClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}
