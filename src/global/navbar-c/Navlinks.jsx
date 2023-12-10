import { Contact, Home, Login, Logout, User } from '../../assets/icons'
import { logoutFirebase } from '../../firebase/providers'
import { useAuth } from '../../hooks'
import { AUTH_STATUS, authStore } from '../../stores/authStore'
import { navStore } from '../../stores/navStore'
import { NavButton, NavLink } from './navlinks-c'

export const Navlinks = () => {
    const { isMenuDisplayed } = navStore(store => store)
    const { status } = authStore(store => store)
    const { logout } = useAuth()
  return (
    <ul className={`absolute right-2 md:right-4 gap-3 ${isMenuDisplayed ? 'grid' : 'hidden'} max-w-[1400px] mx-auto transition-opacity duration-500`}>
      <li>
        <NavLink tooltip='Inicio' to="/">
          <Home />
        </NavLink>
      </li>
      <li>
        <NavLink tooltip='Contacto' to="/contacto">
          <Contact />
        </NavLink>
      </li>
      {status !== AUTH_STATUS.authorized && (
        <li>
          <NavLink tooltip='Iniciar Sesión' to="/iniciar-sesion">
            <Login />
          </NavLink>
        </li>
      )}
      {status === AUTH_STATUS.authorized && (
        <>
          <li>
            <NavLink tooltip='Cuenta' to="/cuenta">
              <User />
            </NavLink>
          </li>
          <li>
            <NavButton tooltip='Cerrar Sesión' handleOnClick={() => {
              logoutFirebase().then(() => {
                logout(null)
              })
            }}>
              <Logout />
            </NavButton>
          </li>
        </>
      )}
    </ul>
  )
}
