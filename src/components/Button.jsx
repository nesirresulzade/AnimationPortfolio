/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({ children, className = '', href, download, target, rel, type = 'button', ...props }) => {
  const cls = `btn ${className}`.trim()
  if (href) {
    return (
      <a href={href} download={download} target={target} rel={rel} className={cls} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  )
}

export default Button
