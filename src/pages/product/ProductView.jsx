import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import {
  authStore,
  cartStore,
  favouritesStore,
  historyStore,
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
  const { favourites, removeFromFavourites, setFavouritesItem } = favouritesStore((store) => store)
  const { addHistoryItem } = historyStore((store) => store)
  const { user } = authStore((store) => store)
  const { products } = productStore((store) => store)
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [amount, setAmount] = useState(0)
  useEffect(() => {
    // si el usuario esta autenticado
    if (user?.uid !== '' && user?.uid !== null) {
      if (Object.keys(product).length === 0) return
      addHistoryItem(product)
    }
  }, [user, product, addHistoryItem])
  const addToCart = () => {
    if (isProductInArray(product.id, cart)) {
      removeFromFavourites(product.id)
      toast.success('Producto eliminado de favoritos')
      return
    }
    setCartItem(product, amount)
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
              gap: '1rem'
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
          <p
            className="mb-2"
            dangerouslySetInnerHTML={{
              __html: product?.metadata?.description.replace(/\n/g, '<br />')
            }}
          ></p>
          <p className="mb-2">
            <strong>Colores disponibles:</strong>
            {product?.metadata?.colors?.map((color, index) => (
              <span key={index} className="inline-block ml-2">
                {color.color.value}
              </span>
            ))}
          </p>
          <p className="mb-2">
            <strong>Tallas disponibles:</strong>
            {product?.metadata?.sizes?.map((size, index) => (
              <span key={index} className="inline-block ml-2">
                {size.size.value}
              </span>
            ))}
          </p>
          <div className='mb-4 flex items-center gap-4'>
            <p>
                <strong>Cantidad:</strong>
            </p>
            <select name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
          </div>
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
          <a
            className="mt-4 text-lg text-slate-700 flex items-center gap-2 mb-5"
            href={product?.metadata?.link}
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-outlined">open_in_new</span>
            Ver producto en tienda oficial
          </a>
          {(product?.metadata?.sizes?.length > 1 ||
            product?.metadata?.colors?.length > 1) && (
            <div>
              <p className="text-sm text-slate-500">
                La selección de tallas o colores no esta disponible porque estos
                productos no forman parte de nuestro inventario si no de el de
                nuestras tiendas de importación, por lo que no tenemos forma de
                garantizar que la talla o color que el usuario ordene estaran
                disponibles al momento de realizar la compra
              </p>
              <p className="text-sm text-slate-500">
                Sin embargo, siempre puede ver el producto en la tienda oficial
                para ver si esta disponible en el color y la talla deseada, o en
                su lugar puede enviar su carrito de compras desde esta tienda
                online para una cotización y consultar a la vendedora la
                disponibilidad de una talla y color especifica del artículo
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
