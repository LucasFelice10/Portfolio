import React from 'react'

export function Input({ className = '', ...props }) {
  return (
    <input
      className={
        'w-full rounded-md border bg-black/40 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent ' +
        className
      }
      {...props}
    />
  )
}
