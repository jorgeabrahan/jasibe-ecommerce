import PropTypes from 'prop-types'

export const Question = ({ question = '', answer = '' }) => {
  return (
    <details className='bg-white rounded-2xl p-5'>
        <summary className='text-3xl cursor-pointer'>{question}</summary>
        <p className='text-lg pt-4'>{answer}</p>
    </details>
  );
}

Question.propTypes = {
    question: PropTypes.string,
    answer: PropTypes.string
}
