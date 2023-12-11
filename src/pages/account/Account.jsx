import { authStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { CopyButton } from '../../general'
import { SplideLayout } from '../../general/SplideLayout'
import { cartStore, favouritesStore, historyStore } from '../../stores'
import { SplideSlide } from '@splidejs/react-splide'
import { SplideProduct } from '../../general/SplideProduct'

export const Account = () => {
  const { user } = authStore((store) => store)
  const { favourites } = favouritesStore((store) => store)
  const { history } = historyStore(store => store)
  const { cart } = cartStore((store) => store)
  const navigate = useNavigate()
  // si el usuario no esta logueado redirigir a la pagina de inicio de sesión
  useEffect(() => {
    if (user?.uid === null || user?.uid === '')
      navigate('/iniciar-sesion', { replace: true })
  }, [user, navigate])
  return (
    <section className="delimiter">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-1 md:gap-3 mb-4">
        <div>
          <span className="font-semibold">ID</span>
          <CopyButton toCopy={user.uid} />
        </div>
        <div>
          <span className="font-semibold">Nombre</span>
          <CopyButton toCopy={user.name} />
        </div>
        <div>
          <span className="font-semibold">Correo</span>
          <CopyButton toCopy={user.email} />
        </div>
      </div>
      <section className="mb-10">
        {favourites.length !== 0 ? (
          <>
            <h2 className="text-5xl font-title mb-5">Mis Favoritos</h2>
            <SplideLayout label="Productos filtrados por categoria y publico objetivo">
              {favourites.length !== 0 &&
                favourites?.map((product) => (
                  <SplideSlide key={product?.slug}>
                    <SplideProduct
                      showFavouriteButton={true}
                      product={product}
                    />
                  </SplideSlide>
                ))}
            </SplideLayout>
          </>
        ) : (
          <p className="text-xl text-center">
            Agregue productos a favoritos para verlos aquí
          </p>
        )}
      </section>
      <section className="mb-10">
        {cart.length !== 0 ? (
          <>
            <h2 className="text-5xl font-title mb-5">Mi Carrito</h2>
            <SplideLayout label="Productos filtrados por categoria y publico objetivo">
              {cart.length !== 0 &&
                cart?.map((product) => (
                  <SplideSlide key={product?.slug}>
                    <SplideProduct
                      showFavouriteButton={true}
                      showCartButton={false}
                      product={product}
                    />
                  </SplideSlide>
                ))}
            </SplideLayout>
          </>
        ) : (
          <p className="text-xl text-center">
            Agregue productos al carrito para verlos aquí
          </p>
        )}
      </section>
      <section className="mb-10">
        {history.length !== 0 ? (
          <>
            <h2 className="text-5xl font-title mb-5">Mi Historial</h2>
            <SplideLayout label="Productos filtrados por categoria y publico objetivo">
              {history.length !== 0 &&
                history?.map((product) => (
                  <SplideSlide key={product?.slug}>
                    <SplideProduct
                      showFavouriteButton={true}
                      showCartButton={true}
                      product={product}
                    />
                  </SplideSlide>
                ))}
            </SplideLayout>
          </>
        ) : (
          <p className="text-xl text-center">
            A medida visualices productos se agregaran a tu historial
          </p>
        )}
      </section>
    </section>
  )
}
