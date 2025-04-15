'use client'
import React from 'react'
import CustomLink from './CustomLink'
import {usePathname} from 'next/navigation'

function Nav() {
  const path = usePathname()
  return (
    <nav className="flex gap-2 items-center">
      <CustomLink isActive={path === '/'}>home</CustomLink>
      <CustomLink isActive={path === '/chart'}>chart</CustomLink>
      <CustomLink isActive={path === '/birds'}>birds</CustomLink>
      <CustomLink isActive={path === '/birdsMix'}>birdsMix</CustomLink>
      <CustomLink isActive={path === '/reader'}>reader</CustomLink>
    </nav>
  )
}

export default Nav
