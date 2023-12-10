import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import { Copy } from '../assets/icons'

export const CopyButton = ({ toCopy = '' }) => {
  const handleCopyUID = () => {
    navigator.clipboard
      .writeText(toCopy)
      .then(() => toast.success('Copiado al portapapeles'))
      .catch(() => toast.error('Error al copiar'))
  }
  return (
    <button className="flex mb-2 shadow-md w-full" onClick={handleCopyUID}>
      <p className="p-2 rounded-l-md border-y border-l border-solid border-black bg-white flex-1">
        {toCopy}
      </p>
      <span className="p-2 rounded-r-md border border-solid border-black bg-white">
        <Copy />
      </span>
    </button>
  )
}

CopyButton.propTypes = {
  toCopy: PropTypes.string
}
