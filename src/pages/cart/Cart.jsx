import { authStore, cartStore } from '../../stores'
import { PrimaryButton, SecondaryLink } from '../../general'
import { CartProduct } from './CartProduct'
import { formatAsCurrency } from '../../helpers/formatAsCurrency'

export const Cart = () => {
  const { user } = authStore((store) => store)
  const { cart } = cartStore((store) => store)
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
        <PrimaryButton>Enviar carrito</PrimaryButton>
      </div>
    </main>
  )
}
