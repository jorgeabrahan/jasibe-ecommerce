import { authStore, cartStore } from '../../stores'
import { PrimaryButton, SecondaryLink } from '../../general'
import { CartProduct } from './CartProduct'
import { formatAsCurrency } from '../../helpers/formatAsCurrency'
import toast from 'react-hot-toast'

export const Cart = () => {
  const { user } = authStore((store) => store)
  const { cart } = cartStore((store) => store)
  const handleSendCart = () => {
    toast.success('Aun no podemos manejar pagos en la app, pero te pondremos en contacto con nuestra vendedora.')
    const waLink = "Vengo del sitio web y estoy interesado en comprar estos productos:\n\n"
    const waCartItems = []
    cart.forEach((item, index) => {
      const waCartItem = []
      waCartItem.push(`Producto no${index + 1} `)
      waCartItem.push(`Imagen: ${item?.thumbnail} `)
      waCartItem.push(`Id: ${item?.id} `)
      waCartItem.push(`Slug: ${item?.slug} `)
      waCartItem.push(`Titulo: ${item?.title} `)
      waCartItem.push(`Descripción: ${item?.metadata?.description} `)
      waCartItem.push(`Cantidad: ${item?.amount} `)
      waCartItem.push(`Link de la tienda oficial: ${item?.metadata?.link} `)
      waCartItems.push(waCartItem.join('\n'))
    })
    const items = waCartItems.join('\n\n\n')
    window.open(`https://wa.me/50494785701?text=${encodeURIComponent(waLink)}${encodeURIComponent(items)}`, '_blank')
  }
  if (cart.length === 0)
    return (
      <p className="text-xl text-center">
        Agregue productos al carrito para verlos aquí
      </p>
    )
  return (
    <main className="delimiter">
      <h2 className="text-5xl font-title mb-3">Carrito de compras</h2>
      <div className="grid gap-3">
        {cart.length !== 0 &&
          cart?.map((product) => (
            <CartProduct key={product?.slug} product={product} />
          ))}
      </div>
      {(user?.uid === '' || user?.uid === null) && (
        <p className="mt-5 text-lg text-slate-700">
          Si no inicia sesión cuando recargue esta pestaña perdera todos los
          artículos agregados al carrito
        </p>
      )}

      <p className="text-2xl text-right">
        <strong>Total carrito: </strong>{' '}
        {formatAsCurrency(cart.reduce(
          (acc, current) => acc + current?.metadata?.price * current?.amount,
          0
        )?.toFixed(2))}
      </p>
      <div className="flex justify-end gap-3 mt-5">
        <SecondaryLink to="/">Seguir comprando</SecondaryLink>
        <PrimaryButton handleOnClick={handleSendCart}>Enviar carrito</PrimaryButton>
      </div>
    </main>
  )
}
