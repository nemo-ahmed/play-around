'use client'
import {useHoveredParagraphCoordinate} from '@/hooks/useHoveredParagraphCoordinate'
import {useGetTopLevelReadableElementsOnPage} from '@/hooks/parser'
import {readAndHighlight} from '@/lib/play'

// This is a simple play button SVG that you can use in your hover player
const PlayButton = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="play-icon"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      cursor: 'pointer',
      background: '#6B78FC',
      borderRadius: '50%',
    }}
    {...props}
  >
    <path
      d="M16.3711 11.3506C16.8711 11.6393 16.8711 12.361 16.3711 12.6497L10.3711 16.1138C9.87109 16.4024 9.24609 16.0416 9.24609 15.4642L9.24609 8.53603C9.24609 7.95868 9.87109 7.59784 10.3711 7.88651L16.3711 11.3506Z"
      fill="white"
    />
  </svg>
)

/**
 * **TBD:**
 * Implement a hover player that appears next to the paragraph when the user hovers over it
 * The hover player should contain a play button that when clicked, should play the text of the paragraph
 * This component should make use of the useHoveredParagraphCoordinate hook to get information about the hovered paragraph
 */
export default function HoverPlayer() {
  const topLevelElements = useGetTopLevelReadableElementsOnPage()
  const hoveredElement = useHoveredParagraphCoordinate(
    topLevelElements as HTMLElement[],
  )
  console.log(topLevelElements)

  if (!hoveredElement) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: hoveredElement.top,
        left: hoveredElement.left,
      }}
    >
      <PlayButton onClick={() => readAndHighlight(hoveredElement.element)} />
    </div>
  )
}
