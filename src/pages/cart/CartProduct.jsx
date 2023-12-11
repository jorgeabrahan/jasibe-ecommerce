import PropTypes from 'prop-types'
import { formatAsCurrency } from '../../helpers/formatAsCurrency'
import { Delete } from '../../assets/icons'
import { cartStore } from '../../stores'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export const CartProduct = ({
  product = { thumbnail: '', slug: '', title: '', metadata: { price: 0 } }
}) => {
  const { removeItem } = cartStore((store) => store)
  const handleRemoveFromCart = () => {
    removeItem(product.id)
    toast.success('Producto eliminado del carrito')
  }
  return (
    <div className="flex gap-4 flex-col sm:flex-row">
      <img
        className="sm:h-[100px] w-full sm:w-[100px] object-cover"
        src={product?.thumbnail}
        alt={product?.slug}
      />
      <div>
        <p className="text-sm text-slate-800 line-clamp-2 leading-tight mb-1">
          {product?.title}
        </p>
        <p className="font-semibold">
          {formatAsCurrency(product?.metadata?.price)}
        </p>
        <div className='flex items-center gap-3'>
            <button
            onClick={handleRemoveFromCart}
            className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105"
            >
            <Delete />
            </button>
            <Link className='text-blue-700 underline' to={`/${product?.slug}`}>Ver producto</Link>
        </div>
      </div>
    </div>
  )
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    thumbnail: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    metadata: PropTypes.shape({
      price: PropTypes.number
    })
  })
}
