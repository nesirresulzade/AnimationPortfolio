/* eslint-disable react/prop-types */
const Button = ({ title = 'Button', className = '' }) => {
  return (
    <button type="button" className={`btn-12 ${className}`}>
      <span>{title}</span>
    </button>
  )
}

export default Button
