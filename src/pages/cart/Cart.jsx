import { authStore, cartStore } from '../../stores'
import { PrimaryButton, SecondaryLink } from '../../general'
import { CartProduct } from './CartProduct'

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
      <div className='grid gap-3'>
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
      <div className="flex justify-end gap-3 mt-5">
        <SecondaryLink to="/">Seguir comprando</SecondaryLink>
        <PrimaryButton>Enviar carrito</PrimaryButton>
      </div>
    </main>
  )
}
