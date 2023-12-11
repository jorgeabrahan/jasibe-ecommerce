import { AddToCart, Heart } from '../assets/icons'
import { formatAsCurrency } from '../helpers/formatAsCurrency'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { cartStore, favouritesStore } from '../stores'
import toast from 'react-hot-toast'
import { isProductInArray } from '../helpers/isProductInCart'

export const SplideProduct = ({
  product = { thumbnail: '', slug: '', title: '', metadata: { price: 0 } },
  showFavouriteButton = false,
  showCartButton = true,
}) => {
  const { cart, setCartItem } = cartStore((store) => store)
  const { favourites, setFavouritesItem } = favouritesStore(store => store)
  const addToCart = () => {
    if (isProductInArray(product.id, cart)) {
      toast.error('El producto ya esta en el carrito')
      return
    }
    setCartItem(product)
    toast.success('Producto agregado al carrito')
  }
  const addToFavourites = () => {
    if (isProductInArray(product.id, favourites)) {
      toast.error('El producto ya esta en favoritos')
      return
    }
    setFavouritesItem(product)
    toast.success('Producto agregado a favoritos')
  }
  return (
    <div className="p-1">
      <Link className='block' to={`/${product?.slug}`}>
        <img
          className="w-full h-[315px] object-cover"
          src={product?.thumbnail}
          alt={product?.slug}
        />
      </Link>
      <Link className="block" to={`/${product?.slug}`}>
        <p className='text-sm text-slate-800 line-clamp-2 leading-tight mb-1'>
          {product?.title}
        </p>
      </Link>
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          {formatAsCurrency(product?.metadata?.price)}
        </span>
        {/* el boton para agregar a favoritos solo se debe mostrar si el usuario esta autenticado */}
        <div className="flex gap-2">
          {showFavouriteButton && (
            <button onClick={addToFavourites} className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105">
              <Heart />
            </button>
          )}
          {showCartButton && (
            <button
              onClick={addToCart}
              className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105"
            >
              <AddToCart />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

SplideProduct.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    metadata: PropTypes.shape({
      price: PropTypes.number
    })
  }),
  showFavouriteButton: PropTypes.bool,
  showCartButton: PropTypes.bool
}
