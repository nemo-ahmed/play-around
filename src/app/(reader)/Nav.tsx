'use client'
import {useEffect, useEffectEvent, useState} from 'react'

import Active from '@/components/ClientActivity'
import {useSpeaky} from '@/context/Speaky'

function ReaderNav() {
  const {onVoiceChange} = useSpeaky()
  const [options, setOptions] = useState<SpeechSynthesisVoice[]>([])

  const handleVoiced = useEffectEvent(() => {
    const voices = window.speechSynthesis.getVoices()
    setOptions(voices)
  })

  useEffect(() => {
    handleVoiced()
  }, [])

  return (
    <nav className="flex gap-2 items-center justify-between p-2">
      <div>
        <Active isVisible={options.length > 0}>
          <select
            className="p-2 pr-4 rounded bg-gray-950/5 dark:bg-gray-50/5"
            id="voices-select"
            onClick={e => {
              e.preventDefault()
              const find = options.find(x => x.name === e.currentTarget.value)
              if (find) onVoiceChange?.(find)
            }}
          >
            {options?.map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </Active>
      </div>
    </nav>
  )
}

export default ReaderNav
