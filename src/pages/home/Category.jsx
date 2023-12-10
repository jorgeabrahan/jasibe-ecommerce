import PropTypes from 'prop-types'

export const Category = ({
  image = { src: '', alt: '' },
  title = '',
  isActive = false,
  handleCategoryClick = () => {}
}) => {
  return (
    <button onClick={handleCategoryClick}>
      <figure
        className={`relative min-w-max cursor-pointer shadow-lg rounded-2xl ${
          isActive ? '' : 'hover:scale-95'
        } transition-transform duration-500`}
      >
        <img
          className="w-40 h-16 object-cover rounded-2xl"
          src={image.src}
          alt={image.alt}
        />
        <div
          className={`bg-black/40 ${
            isActive ? 'backdrop-blur-sm' : ''
          } absolute inset-0 h-full w-full rounded-2xl`}
        ></div>
        <figcaption className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-white text-2xl font-cursive">
          {title}
        </figcaption>
      </figure>
    </button>
  )
}

Category.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }),
  title: PropTypes.string.isRequired,
  activeCategory: PropTypes.bool,
  isActive: PropTypes.bool,
  handleCategoryClick: PropTypes.func.isRequired
}
