import { Splide } from '@splidejs/react-splide'
import PropTypes from 'prop-types'

export const SplideLayout = ({ label = '', children }) => {
  return (
    <Splide
      options={{
        perPage: 5,
        rewind: true,
        breakpoints: {
          500: {
            perPage: 1
          },
          768: {
            perPage: 2
          },
          1024: {
            perPage: 3
          }
        }
      }}
      aria-label={label}
    >
      {children}
    </Splide>
  )
}

SplideLayout.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node
}
