'use client'
import CustomLink from './CustomLink'
import {usePathname} from 'next/navigation'

function Nav() {
  const path = usePathname()

  return (
    <nav className="flex gap-2 items-center justify-between p-2">
      <div className="flex gap-2 items-center">
        <CustomLink isActive={path === '/'}>home</CustomLink>
        <CustomLink isActive={path === '/chart'}>chart</CustomLink>
        <CustomLink isActive={path === '/birds'}>birds</CustomLink>
        <CustomLink isActive={path === '/birdsMix'}>birdsMix</CustomLink>
        <CustomLink isActive={path === '/reader'}>reader</CustomLink>
        <CustomLink isActive={path === '/maze'}>maze</CustomLink>
        <CustomLink isActive={path === '/form'}>form</CustomLink>
        <CustomLink isActive={path === '/products'}>products</CustomLink>
        <CustomLink isActive={path === '/interesting-css'}>
          interesting css
        </CustomLink>
        <CustomLink isActive={path === '/soduku'}>soduku</CustomLink>
      </div>
    </nav>
  )
}

export default Nav
