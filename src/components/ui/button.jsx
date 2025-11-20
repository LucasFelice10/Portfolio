import React from 'react'

export function Button({ className = '', variant = 'solid', size = 'md', ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    solid: 'bg-violet-600 hover:bg-violet-700 text-white',
    outline:
      'border border-violet-500/50 text-violet-300 hover:text-violet-200 hover:bg-violet-900/20',
    ghost: 'text-gray-300 hover:text-violet-400 hover:bg-violet-500/10'
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10'
  }

  const classes = [
    base,
    variants[variant] || variants.solid,
    sizes[size] || sizes.md,
    className
  ]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} {...props} />
}
