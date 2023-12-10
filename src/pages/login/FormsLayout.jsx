import PropTypes from 'prop-types'

export const FormsLayout = ({ title = '', description = '', children }) => {
  return (
    <div className="max-w-md mx-auto mb-14 sm:bg-white/10 sm:shadow-2xl sm:px-4 sm:py-8 rounded-xl sm:border sm:border-gray-200 sm:backdrop-blur-lg">
      <h2 className="font-bold text-4xl font-cursive">{title}</h2>
      <p className="text-neutral-700 leading-tight mb-6">{description}</p>
      {children}
    </div>
  )
}

FormsLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
