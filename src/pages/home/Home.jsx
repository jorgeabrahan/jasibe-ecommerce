import { Category } from './Category'
import { authStore, productStore } from '../../stores'
import React, { useEffect, useState } from 'react'
import { CategorySelector } from './CategorySelector'
import { SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import { SplideProduct } from '../../general/SplideProduct'
import { SplideLayout } from '../../general/SplideLayout'
import { AllYouNeed, Entrega } from '../../assets/images/home'
import { AmazonLogo, SheinLogo } from '../../assets/images'
import { Question } from './Question'
import { Chat, Contact, Instagram, Mail } from '../../assets/icons'

export const Home = () => {
  const { products, targetAudiences, categories, recentProducts } =
    productStore((store) => store)
  const { user } = authStore((store) => store)
  const [activeAudience, setActiveAudience] = useState(null)
  const [categoriesByAudience, setCategoriesByAudience] = useState(categories)
  const [activeCategory, setActiveCategory] = useState(null)
  const [productsFiltered, setProductsFiltered] = useState([])
  /* establecer la audiencia activa cuando carguen las audiencias de la base de datos */
  useEffect(() => {
    if (targetAudiences.length === 0 || activeAudience !== null) return
    setActiveAudience(targetAudiences[0]?.slug)
  }, [targetAudiences, activeAudience])
  /* establecer las categorias filtradas por audiencia cada vez que la audiencia activa cambie */
  useEffect(() => {
    if (categories.length === 0 || activeAudience === null) return
    /* Si no se aplica ningun filtro a las categorias */
    if (activeAudience === 'todas') {
      setCategoriesByAudience(categories)
      return
    }
    const filtered = categories.filter((category) =>
      category?.metadata?.target_audiences?.find(
        (target) => target.slug === activeAudience
      )
    )
    setCategoriesByAudience(filtered)
    setActiveCategory(filtered[0] === undefined ? null : filtered[0])
  }, [activeAudience, categories])
  /* filtrar los productos segun la audiencia activa y la categoria activa */
  useEffect(() => {
    if (
      products.length === 0 ||
      products === null ||
      activeCategory === null ||
      activeAudience === null
    )
      return
    const filtered = products.filter(
      (product) =>
        product?.metadata?.category?.slug === activeCategory?.slug &&
        (product?.metadata?.target_audiences?.find(
          (target) => target?.slug === activeAudience
        ) !== undefined ||
          activeAudience === 'todas')
    )
    setProductsFiltered(filtered)
  }, [activeAudience, activeCategory, products])
  return (
    <main className="delimiter">
      <div className="flex mb-4 items-center">
        {targetAudiences?.map((target) => (
          <React.Fragment key={target.slug}>
            <CategorySelector
              title={target?.title}
              slug={target?.slug}
              activeAudience={activeAudience}
              setActiveAudience={setActiveAudience}
            />
            <span className="font-cursive text-xl"> / </span>
          </React.Fragment>
        ))}
        <CategorySelector
          title="Todas"
          slug="todas"
          activeAudience={activeAudience}
          setActiveAudience={setActiveAudience}
        />
      </div>
      <section className="flex gap-3 overflow-x-scroll cx-scrollbar pb-3 mb-10">
        {categoriesByAudience?.map((category) => (
          <Category
            key={category?.slug}
            image={{
              src: category?.thumbnail,
              alt: `categoría de ${category?.title}`
            }}
            title={category?.title}
            isActive={activeCategory?.slug === category?.slug}
            handleCategoryClick={() => setActiveCategory(category)}
          />
        ))}
      </section>
      <section className="mb-10">
        <h2 className="text-5xl font-title mb-5">
          {activeCategory?.title}{' '}
          {activeAudience !== 'todas' && `para ${activeAudience}`}
        </h2>
        <SplideLayout label="Productos filtrados por categoria y publico objetivo">
          {productsFiltered.length !== 0 &&
            productsFiltered?.map((product) => (
              <SplideSlide key={product?.slug}>
                <SplideProduct
                  showFavouriteButton={user?.uid !== '' && user?.uid !== null}
                  product={product}
                />
              </SplideSlide>
            ))}
        </SplideLayout>
      </section>
      <section className="relative bg-white shadow-lg my-20 flex items-center justify-between px-4 rounded-xl overflow-hidden h-[400px]">
        <div className="max-w-[500px] md:pl-8 relative z-10">
          <h2 className="text-5xl font-title">Entregas en todo Honduras</h2>
          <p className="text-lg">
            Nosotros nos encargamos de la entrega de tu pedido en cualquier
            parte de Honduras
          </p>
        </div>
        <img
          className="absolute -right-40 sm:-right-20 md:static h-[400px]"
          src={Entrega}
          alt="entregas en todo Honduras de tus pedidos"
        />
      </section>
      <section>
        <h2 className="text-5xl font-title mb-5">Agregados recientemente</h2>
        <SplideLayout>
          {recentProducts?.map((product) => (
            <SplideSlide key={product?.slug}>
              <SplideProduct
                showFavouriteButton={user?.uid !== '' && user?.uid !== null}
                product={product}
              />
            </SplideSlide>
          ))}
        </SplideLayout>
      </section>
      <section className="bg-white relative my-20 rounded-xl overflow-hidden shadow-lg h-[400px]">
        <img src={AllYouNeed} alt="tenemos todo lo que necesitas" />
        <div className="absolute inset-0 w-full h-full bg-black/80"></div>
        <div className="absolute left-4 bottom-4 text-white">
          <h2 className="font-title text-5xl">Facilita tus compras</h2>
          <p className="text-lg">
            ¡Tenemos todo lo que buscas, y si no, lo conseguimos por ti!
          </p>
        </div>
      </section>
      <section className="mb-20">
        <h2 className="text-center text-5xl font-title mb-3">
          Tiendas de importación
        </h2>
        <p className="text-center text-slate-700 mb-5 max-w-[800px] mx-auto">
          Si no encuentras lo que buscas aquí, siempre puedes buscar los
          productos en nuestras tiendas de importación y nosotros nos haremos
          cargo de que lleguen a la puerta de tu casa
        </p>
        <div className="flex justify-center items-center gap-4">
          <a href="https://www.amazon.com/" target="_blank" rel="noreferrer">
            <img
              className="max-w-[140px] md:max-w-[200px]"
              src={AmazonLogo}
              alt="Logo de Amazon"
            />
          </a>
          <a href="https://us.shein.com/" target="_blank" rel="noreferrer">
            <img
              className="max-w-[140px] md:max-w-[200px]"
              src={SheinLogo}
              alt="Logo de Shein"
            />
          </a>
        </div>
      </section>
      <section className="mb-20">
        <h2 className="text-center text-5xl font-title mb-5">
          ¿Tienes mas preguntas?
        </h2>
        <div className="grid gap-4">
          <Question
            question="¿Cuáles son los métodos de pago aceptados?"
            answer="Aceptamos pagos con transferencia bancaria, pagos al Recibir"
          />
          <Question
            question="¿Cuánto tiempo tarda en llegar mi pedido?"
            answer="El tiempo de entrega varía según la ubicación. Por lo general, los pedidos se entregan entre 3 y 4 días hábiles una vez procesados(ya sean fuera de Progreso)"
          />
          <Question
            question="¿Puedo realizar cambios o devoluciones?"
            answer="No, precisamente por esta razón antes de que el cliente nos envie los articulos que desea que le compremos se debe asegurar que son los que quiere y que el vendedor en una de nuestras tiendas de importación son de confianza en base a las reseñas que han recibido. Como nosotros solo nos encargamos de traer el producto, no podemos hacernos cargo de los reclamos."
          />
          <Question
            question="¿Ofrecen envío gratuito?"
            answer="Sí, siempre y cuando sea adentro del sector, es decir, de Progreso; si es fuera entonces se cobrara adicional."
          />
          <Question
            question="¿Cómo puedo realizar un seguimiento de mi pedido?"
            answer="Una vez que tu pedido sea despachado, recibirás un correo electrónico con un número de seguimiento para rastrear el estado de tu envío."
          />
          <Question
            question="¿Tienen atención al cliente?"
            answer="Sí, se les entiende de Lunes a Sábado 7:00am - 9:00pm"
          />
          <Question
            question="¿Puedo cancelar un pedido después de haberlo realizado?"
            answer="Si, siempre y cuando no haya realizado el deposito aún."
          />
          <Question
            question="¿Dónde puedo encontrar información sobre tallas y medidas?"
            answer="En la página de cada producto, encontrarás una guía de tallas y medidas para ayudarte a elegir la opción adecuada."
          />
          <Question
            question="¿Los productos tienen garantía?"
            answer="Solo los productos de joyería, los productos que se importen no."
          />
          <Question
            question="¿Hacen envíos nacionales?"
            answer="Sí, realizamos envíos a nivel nacional Los tiempos de entrega y costos pueden variar según el lugar donde se encuentre el cliente."
          />
        </div>
      </section>
      <section>
        <h2 className="text-4xl text-center">Sobre Nosotros</h2>
        <div className='my-5 max-w-[1000px] mx-auto'>
          <h2 className="text-3xl font-cursive text-center">Misión</h2>
          <p>
            Nuestra misión es ofrecer a nuestros clientes joyería de alta calidad
            y belleza excepcional. Nos esforzamos por ser la elección preferida de
            quienes buscan piezas únicas y elegantes que realzan su estilo y
            expresen su individualidad. Nos comprometemos a proporcionar un
            servicio excepcional, calidad superior y una experiencia de compra sin
            igual, todo respaldado por nuestra pasión por la excelencia y la
            satisfacción del cliente.
          </p>
        </div>
        <div className='my-5 max-w-[1000px] mx-auto'>
          <h2 className="text-3xl font-cursive text-center">Visión</h2>
          <p>
            Nuestra visión es ser reconocidos con una amplia gama de productos que
            reflejen la última tendencia y estilo. Buscamos expandir nuestro
            alcance global y establecer relaciones duraderas con nuestros
            clientes, brindando confianza y satisfacción en cada compra. Nos
            esforzamos por ser innovadores en el diseño de joyería y mantener un
            compromiso inquebrantable con la calidad y la ética en cada paso de
            nuestra cadena de suministro, contribuyendo al bienestar de nuestros
            empleados y al desarrollo sostenible de la industria de la joyería.
          </p>
        </div>
        <div className='my-5 max-w-[1000px] mx-auto'>
          <h2 className="text-3xl font-cursive text-center">
            Historia de la empresa
          </h2>
          <p>
            Jasibe es una empresa dedicada a la venta de joyería de alta calidad y
            exquisita belleza a través de la plataforma de Instagram, Facebook,
            TikTok. Nuestra pasión por la joyería excepcional y nuestra dedicación
            a la satisfacción del cliente son los pilares fundamentales de nuestra
            operación. Nos enorgullece ofrecer a nuestros clientes una amplia
            selección de joyería que abarca desde clásicos atemporales hasta
            diseños vanguardistas, todos meticulosamente seleccionados para
            cumplir con los estándares más altos de calidad y elegancia. Cada
            pieza que ofrecemos refleja artesanía y atención al detalle, y muchas
            de ellas son auténticas obras de arte.
          </p>
        </div>
      </section>
      <section className="mb-10">
        <h2 className="text-3xl font-cursive text-center">Contactanos</h2>
        <p className="text-center text-slate-700 mb-5 max-w-[800px] mx-auto">
          Si lo prefieres puedes contactarnos por cualquiera de estos medios:
        </p>
        <div className="grid gap-4 justify-center">
          <a
            className="flex items-center gap-2 text-xl"
            href="tel:+50494785701"
            target="_blank"
            rel="noreferrer"
          >
            <Contact color="#000" />
            +504 9478-5701
          </a>
          <a
            className="flex items-center gap-2 text-xl"
            href="mailto:Katherinenavarrete611@gmail.com?subject=Interesado en la importación de productos&body=Estoy interesado en obtener más información sobre la importación de productos y el costo de esto. Vengo de la página web."
            target="_blank"
            rel="noreferrer"
          >
            <Mail />
            Katherinenavarrete611@gmail.com
          </a>
          {/* whatsapp */}
          <a
            className="flex items-center gap-2 text-xl"
            href="https://wa.me/50494785701?text=Vengo del sitio web y estoy interesado en obtener más información sobre los productos y la importación de los mismos."
            target="_blank"
            rel="noreferrer"
          >
            <Chat />
            9478-5701
          </a>
          <a
            className="flex items-center gap-2 text-xl"
            href="https://www.instagram.com/jasibe.hn/"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram />
            @jasibe.hn
          </a>
        </div>
      </section>
    </main>
  )
}
