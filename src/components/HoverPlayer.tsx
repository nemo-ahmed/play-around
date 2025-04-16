'use client'
import {useHoveredParagraphCoordinate} from '@/hooks/useHoveredParagraphCoordinate'
import {useGetTopLevelReadableElementsOnPage} from '@/hooks/useGetTopLevelReadableElementsOnPage'
import {readAndHighlight} from '@/lib/play'
import {IoIosPause, IoIosPlay} from 'react-icons/io'
import {useState, type ButtonHTMLAttributes} from 'react'

// This is a simple play button SVG that you can use in your hover player
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

/**
 * **TBD:**
 * Implement a hover player that appears next to the paragraph when the user hovers over it
 * The hover player should contain a play button that when clicked, should play the text of the paragraph
 * This component should make use of the useHoveredParagraphCoordinate hook to get information about the hovered paragraph
 */
export default function HoverPlayer() {
  const [isPaused, setIsPaused] = useState(false)
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
          } else readAndHighlight(hoveredElement.element)
        }}
      />
    </div>
  )
}
