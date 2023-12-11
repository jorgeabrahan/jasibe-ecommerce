import { useRef, useState } from 'react';
import { Input } from './Input'
import { TextArea } from './TextArea'
import { Chat, Instagram, Mail, Contact as ContactIcon } from '../../assets/icons';

export const Contact = () => {
  const formRef = useRef(null)
  const phoneRef = useRef(null)
  const [message, setMessage] = useState(null)
  const getDataCountry = async () => {
    try {
      const res = await fetch('https://ipapi.co/json')
      const data = await res.json()
      return data.country_code
    } catch (err) {
      console.error(err)
      return 'us'
    }
  }

  const initPhoneInput = (node) => {
    if (node === null) return
    phoneRef.current = window.intlTelInput(node, {
      placeholderNumberType: 'FIXED_LINE',
      initialCountry: 'auto',
      preferredCountries: [
        'hn',
        'us',
        'cr',
        'sv',
        'gt',
        'ni',
        'pa',
        'bs',
        'ag',
        'cu',
        'dm',
        'do',
        'ht',
        'jm',
        'kn',
        'lc',
        'vc',
        'tt',
        'mx'
      ],
      geoIpLookup: async (callback) => {
        const code = await getDataCountry()
        callback(code)
      },
      separateDialCode: true,
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js'
    })
  }

  const validateAndSubmitForm = () => {
    if (!phoneRef.current.isValidNumber()) {
      setMessage('El numero no es valido')
      return false;
    }
    formRef.current.noTelefono.value = phoneRef.current.getNumber()
    setMessage('Espera mientras enviamos el formulario...')
    setTimeout(() => {
      setMessage('Gracias por comunicarte con nosotros!')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
    }, 3000)
  }
  return (
    <main className="delimiter">
      <section className='mb-10'>
        <h2 className='text-4xl font-title mb-10 text-center'>Cuentanos que necesitas</h2>
        <form
          className="bg-white rounded-3xl px-4 md:px-10 pt-10 md:pt-20 pb-6 md:pb-12 w-full"
          id="contactForm"
          action="https://formsubmit.co/jorge24abrahan@gmail.com"
          method="POST"
          onSubmit={() => validateAndSubmitForm()}
          ref={formRef}
        >
          <fieldset className="grid gap-7 mb-10">
            <legend className="sr-only">User info</legend>
            <Input id="nombre" text="nombre" />
            <Input id="noTelefono" text="Número de teléfono" type="tel" inputRef={initPhoneInput} />
            <Input id="correo" text="Correo electrónico" type="email" />
            <TextArea text="Mensaje" id="mensaje" />
          </fieldset>
          <input
            type="hidden"
            name="_next"
            value="http://localhost:5173/contacto"
          />
          <input
            type="hidden"
            name="_subject"
            value="Formulario de contacto enviado desde Jasibe - Contacto"
          />
          <input type="hidden" name="_captcha" value="false" />
          {message !== null && (
            <p>{message}</p>
          )}
          <button className="cursor-pointer ml-auto px-[30px] py-4 text-white bg-blue-500 rounded-[30px] block w-max">
            Enviar
          </button>
        </form>
      </section>
      <section className='mb-10'>
        <h2 className='text-4xl font-title text-center'>Contactanos</h2>
        <p className='text-center text-slate-700 mb-5 max-w-[800px] mx-auto'>Si lo prefieres puedes contactarnos por cualquiera de estos medios:</p>
        <div className='grid gap-4 justify-center'>
          <a className='flex items-center gap-2 text-xl' href="" target='_blank' rel='noreferrer'>
            <ContactIcon color='#000' />
            +504 9478-5701
          </a>
          <a className='flex items-center gap-2 text-xl' href="" target='_blank' rel='noreferrer'>
            <Mail />
            Katherinenavarrete611@gmail.com
          </a>
          {/* whatsapp */}
          <a className='flex items-center gap-2 text-xl' href="" target='_blank' rel='noreferrer'>
            <Chat />
            9478-5701
          </a>
          <a className='flex items-center gap-2 text-xl' href="https://www.instagram.com/jasibe.hn/" target='_blank' rel='noreferrer'>
            <Instagram />
            @jasibe.hn
          </a>
        </div>
      </section>
    </main>
  )
}
