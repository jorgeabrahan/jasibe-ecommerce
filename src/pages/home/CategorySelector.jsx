import PropTypes from 'prop-types'

export const CategorySelector = ({
  title = '',
  slug = '',
  activeAudience = '',
  setActiveAudience = () => {}
}) => {
  return (
    <>
      <button
        className="px-3 font-cursive relative"
        onClick={() => setActiveAudience(slug)}
      >
        {title}
        <div
          className={`h-[2px] bg-black/40 transition-[width] duration-500 hover:w-full ${
            activeAudience === slug ? 'w-full' : 'w-0'
          }`}
        ></div>
      </button>
    </>
  )
}

CategorySelector.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  activeAudience: PropTypes.string,
  setActiveAudience: PropTypes.func.isRequired
}
