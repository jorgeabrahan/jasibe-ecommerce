import { AddToCart, Heart } from "../../assets/icons"
import { formatAsCurrency } from "../../helpers/formatAsCurrency"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export const SplideProduct = ({ product = { thumbnail: '', slug: '', title: '', metadata: { price: 0 } } }) => {
  return (
    <Link className="block p-1" to="#">
      <img
        className="w-full h-[315px] object-cover"
        src={product?.thumbnail}
        alt={product?.slug}
      />
      <p className="text-sm text-slate-800 line-clamp-2 leading-tight mb-1">
        {product?.title}
      </p>
      <div className="flex justify-between items-center">
        <span className="font-semibold">
          {formatAsCurrency(product?.metadata?.price)}
        </span>
        {/* el boton para agregar a favoritos solo se debe mostrar si el usuario esta autenticado */}
        <div className="flex gap-2">
          <button className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105">
            <Heart />
          </button>
          <button className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105">
            <AddToCart />
          </button>
        </div>
      </div>
    </Link>
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
    })
}
