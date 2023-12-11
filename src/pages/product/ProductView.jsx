import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import {
  authStore,
  cartStore,
  favouritesStore,
  productStore
} from '../../stores'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { formatAsCurrency } from '../../helpers/formatAsCurrency'
import { PrimaryButton } from '../../general'
import { Heart } from '../../assets/icons'
import { isProductInArray } from '../../helpers/isProductInCart'

export const ProductView = () => {
  let { product_slug } = useParams()
  const { cart, setCartItem } = cartStore((store) => store)
  const { favourites, setFavouritesItem } = favouritesStore((store) => store)
  const { user } = authStore((store) => store)
  const { products } = productStore((store) => store)
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
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
  useEffect(() => {
    const itDoesntExist = () => {
      navigate('/', { replace: true })
      toast.error('El producto que intentas visualizar no existe')
    }
    if (
      product_slug === null ||
      product_slug === undefined ||
      product_slug === ''
    ) {
      itDoesntExist()
      return
    }
    const foundProduct = products.find((item) => item.slug === product_slug)
    if (foundProduct === undefined) {
      itDoesntExist()
      return
    }
    setProduct(foundProduct)
  }, [product_slug, navigate, products])
  return (
    <main className="delimiter">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <Splide
            options={{
              type: 'loop',
              gap: '1rem',
              autoplay: true
            }}
          >
            {product?.metadata?.images?.map((image, index) => (
              <SplideSlide key={index}>
                <img
                  src={image.image.url}
                  alt={`product-${index}`}
                  className="w-full h-auto"
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-2xl font-bold mb-2">{product?.title}</h2>
          <p className="text-xl font-semibold mb-2">
            {formatAsCurrency(product?.metadata?.price)}
          </p>
          <p className="mb-2">{product?.metadata?.description}</p>
          <p className="mb-2">
            Colores disponibles:
            {product?.metadata?.colors?.map((color, index) => (
              <span key={index} className="inline-block ml-2">
                {color.color.value}
              </span>
            ))}
          </p>
          <p className="mb-2">
            Tallas disponibles:
            {product?.metadata?.sizes?.map((size, index) => (
              <span key={index} className="inline-block ml-2">
                {size.size.value}
              </span>
            ))}
          </p>
          <div className="flex gap-3">
            <PrimaryButton handleOnClick={addToCart}>
              Agregar al carrito
            </PrimaryButton>
            {user?.uid !== '' && user?.uid !== null && (
              <button
                onClick={addToFavourites}
                className="bg-white p-2 transition-transform duration-500 rounded-full border border-solid border-black/40 hover:scale-105"
              >
                <Heart />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
