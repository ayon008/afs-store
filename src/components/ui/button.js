import React from 'react'

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={
        'inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-95 disabled:opacity-50 ' +
        className
      }
    >
      {children}
    </button>
  )
}

export default Button
