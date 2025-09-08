import Link from 'next/link'
import React from 'react'

const className = 'capitalize'

function CustomLink({
  children,
  isActive,
}: {
  children: string
  isActive: boolean
}) {
  if (isActive)
    return (
      <span
        className={
          className +
          ' text-gray-700 dark:text-gray-300 cursor-default font-medium'
        }
      >
        {children}
      </span>
    )
  return (
    <Link
      href={`/${children !== 'home' ? children : ''}`}
      className={className}
    >
      {children}
    </Link>
  )
}

export default CustomLink
