import { Link } from 'react-router-dom'
import { Cart, Menu } from '../assets/icons'
import { JasibeDarkNoSloganLogo } from '../assets/images'
import { Navlinks } from './navbar-c/Navlinks'
import { navStore } from '../stores/navStore'

export const Navbar = () => {
  const { isMenuDisplayed, setIsMenuDisplayed } = navStore((store) => store)
  return (
    <nav className="sticky top-0 py-2 md:py-4 delimiter mb-14 z-50 backdrop-blur-xl rounded-b-md lg:rounded-b-xl bg-lavender/80">
      <div>
        <img
          className="max-w-[150px] xs:mx-auto"
          src={JasibeDarkNoSloganLogo}
          alt="Jasibe - regalo del cielo (logo en negro sin slogan)"
        />
        <ul className="flex gap-3 absolute right-2 md:right-4 top-[50%] -translate-y-[50%]">
          <li>
            <Link
              className="block p-4 rounded-full bg-off-red/60 border border-solid border-off-red"
              to="/carrito"
            >
              <Cart />
            </Link>
          </li>
          <li>
            <button
              onClick={() => setIsMenuDisplayed(!isMenuDisplayed)}
              className="block p-4 rounded-full bg-off-red/60 border border-solid border-off-red"
            >
              <Menu />
            </button>
          </li>
        </ul>
      </div>
      <Navlinks />
    </nav>
  )
}

{/* <script>
    const navbar = document.querySelector("#navbar");
    const btnToggleMenu = document.querySelector('#btnToggleMenu')
    const menu = document.querySelector('#menu')
    let isMenuOpened = false
    btnToggleMenu.addEventListener('click', () => {
        if (isMenuOpened) {
            menu.style.transform = ''
            isMenuOpened = false
            return
        }
        menu.style.transform = 'translateX(0)'
        isMenuOpened = true
    })
    // flag that indicates if navbar padding has already been reduced
    let areScrollStylesApplied = false
    // event to reduce the navbar paddingY depending on the user vertical scroll
    window.addEventListener('scroll', () => {
        const offsetY = window.scrollY
        if (offsetY === null || offsetY === undefined) return
        if (Math.round(offsetY) > 400 && !areScrollStylesApplied) {
            const mq = window.matchMedia("(min-width: 1024px)")
            // on desktop reduce padding to 1rem on mobile to 0.25rem
            if (mq.matches) navbar.style.paddingBlock = '20px'
            navbar.style.background = 'rgba(255, 252, 250, 0.85)'
            areScrollStylesApplied = true
            return
        }
        if (Math.round(offsetY) <= 320 && areScrollStylesApplied) {
            navbar.style.background = ''
            navbar.style.paddingBlock = ''
            areScrollStylesApplied = false
        }
    })
</script> */}
