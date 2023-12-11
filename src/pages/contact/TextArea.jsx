import PropTypes from 'prop-types'

export const TextArea = ({ text = '', id = '' }) => {
  return (
    <div className="relative">
      <label
        className="absolute -top-3 left-7 text-xs text-davys-gray p-1 bg-white"
        htmlFor={id}
      >
        {text}
      </label>
      <textarea
        className="border border-solid border-davys-gray-500 rounded-[30px] w-full px-5 py-3 resize-none"
        autoComplete="off"
        spellCheck="off"
        name={id}
        id={id}
        cols="30"
        rows="5"
      ></textarea>
    </div>
  )
}

TextArea.propTypes = {
    text: PropTypes.string,
    id: PropTypes.string
}
