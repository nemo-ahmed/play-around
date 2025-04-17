'use client'
import {useHoveredParagraphCoordinate} from '@/hooks/useHoveredParagraphCoordinate'
import {useGetTopLevelReadableElementsOnPage} from '@/hooks/useGetTopLevelReadableElementsOnPage'
import {IoIosPause, IoIosPlay} from 'react-icons/io'
import {useState, type ButtonHTMLAttributes} from 'react'
import {useSpeaky} from '@/context/Speaky'
import {readAndHighlight} from '@/utils/speaky'

const PlayButton = ({
  isPlaying,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {isPlaying: boolean}) => (
  <button
    type="button"
    {...props}
    className="size-6 rounded-full bg-blue-600 flex items-center justify-center"
  >
    {isPlaying ? (
      <IoIosPause size={20} />
    ) : (
      <IoIosPlay size={20} className="pl-0.5" />
    )}
  </button>
)

export default function HoverPlayer() {
  const [isPaused, setIsPaused] = useState(false)
  const {voice} = useSpeaky()
  const topLevelElements = useGetTopLevelReadableElementsOnPage()
  const hoveredElement = useHoveredParagraphCoordinate(
    topLevelElements as HTMLElement[],
  )

  if (!hoveredElement) return null
  return (
    <div
      style={{
        position: 'absolute',
        top: hoveredElement.top,
        left: hoveredElement.left,
      }}
    >
      <PlayButton
        isPlaying={isPaused}
        onClick={() => {
          const speech = window.speechSynthesis
          if (speech.speaking && !isPaused) {
            speech.pause()
            setIsPaused(true)
          } else if (isPaused) {
            speech.resume()
            setIsPaused(false)
          } else readAndHighlight?.(hoveredElement.element, voice)
        }}
      />
    </div>
  )
}
