'use client'

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

const Speaky = createContext<{
  onVoiceChange?: (v: SpeechSynthesisVoice) => void
  voice?: SpeechSynthesisVoice
}>({})

export default function SpeakyProvider({children}: {children: ReactNode}) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice>()

  const onVoiceChange = (v: SpeechSynthesisVoice) => {
    setVoice(v)
  }

  const value = useMemo(() => ({onVoiceChange, voice}), [voice])
  return <Speaky value={value}>{children}</Speaky>
}

export function useSpeaky() {
  const speaky = useContext(Speaky)
  if (!speaky.onVoiceChange) {
    throw new Error('useSpeaky need to be used inside SpeakyProvider')
  }
  return speaky
}
