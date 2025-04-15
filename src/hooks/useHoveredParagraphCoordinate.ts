import {useCallback, useEffect, useState} from 'react'

export function getElementBounds(elem: HTMLElement) {
  const bounds = elem.getBoundingClientRect()
  const top = bounds.top + window.scrollY
  const left = bounds.left + window.scrollX

  return {
    x: left,
    y: top,
    top,
    left,
    width: bounds.width,
    height: bounds.height,
  }
}

export function isPointInsideElement(
  coordinate: {x: number; y: number},
  element: HTMLElement,
): boolean {
  const elementCords = getElementBounds(element)

  return (
    coordinate.x >= elementCords.x &&
    coordinate.x <= elementCords.x + elementCords.width &&
    coordinate.y >= elementCords.y &&
    coordinate.y <= elementCords.y + elementCords.height
  )
}

export function getLineHeightOfFirstLine(element: HTMLElement): number {
  return element.clientHeight
}

export type HoveredElementInfo = {
  element: HTMLElement
  top: number
  left: number
  heightOfFirstLine: number
}

export function useHoveredParagraphCoordinate(
  parsedElements: HTMLElement[],
): HoveredElementInfo | null {
  const [hoveredElement, setHoveredElement] =
    useState<HoveredElementInfo | null>(null)

  const trackingMouseMovement = useCallback(
    (e: MouseEvent) => {
      const element = parsedElements.find(el =>
        isPointInsideElement({x: e.clientX, y: e.clientY}, el),
      )
      if (
        // ? Checking if both are not null
        ((!element || !hoveredElement) &&
          element !== null &&
          hoveredElement !== null) ||
        // ? checking if we are still moving inside of the same element
        !(
          element &&
          hoveredElement &&
          element.isSameNode(hoveredElement?.element)
        )
      ) {
        const elementCords = element
          ? getElementBounds(element)
          : // ? just for ts
            {top: 1, left: 1, heightOfFirstLine: 100}

        setHoveredElement(
          element
            ? {
                left: elementCords.left,
                top: elementCords.top,
                // ?  I didnt see a needed implementation for this
                heightOfFirstLine: 100,
                element,
              }
            : null,
        )
      }
    },
    [hoveredElement, parsedElements],
  )

  useEffect(() => {
    window.addEventListener('mousemove', trackingMouseMovement)
    return () => {
      window.removeEventListener('mousemove', trackingMouseMovement)
    }
  }, [trackingMouseMovement])

  return hoveredElement
}
