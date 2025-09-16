'use client'
import React, {useEffect, useState} from 'react'
import CustomLink from './CustomLink'
import {usePathname} from 'next/navigation'
import {useSpeaky} from '@/context/Speaky'

function Nav() {
  const path = usePathname()
  const {onVoiceChange} = useSpeaky()
  const [options, setOptions] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    setOptions(window.speechSynthesis.getVoices())
    if ('onvoiceschanged' in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        const voices = window.speechSynthesis.getVoices()
        setOptions(voices)
      }
    }
  }, [])

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
        <CustomLink isActive={path === '/weird-css'}>weird-css</CustomLink>
        <CustomLink isActive={path === '/soduku'}>soduku</CustomLink>
      </div>
      <div>
        {options.length > 0 && (
          <select
            className="p-2 pr-4 rounded bg-gray-950/5 dark:bg-gray-50/5"
            id="voices-select"
            onClick={e => {
              e.preventDefault()
              const find = options.find(x => x.name === e.currentTarget.value)
              if (find) onVoiceChange?.(find)
              console.log(e.currentTarget.value, find, onVoiceChange)
            }}
          >
            {options?.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </nav>
  )
}

export default Nav
