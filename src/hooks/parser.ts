'use client'
import type {Ele} from '@/types/typings'
import {useMemo} from 'react'

const IGNORE_LIST = [
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BUTTON',
  'LABEL',
  'SPAN',
  'IMG',
  'PRE',
  'SCRIPT',
  'SVG',
]
const CONTAINER_LIST = ['DIV', 'SECTION', 'ARTICLE', 'MAIN']
const READABLE_LIST = ['P', 'CODE', 'BLOCKQUOTE']

export function useGetTopLevelReadableElementsOnPage(): Ele[] {
  const parsedElements = useMemo(() => {
    if (typeof document === 'undefined') {
      return []
    }
    // ? Iterate on body subChildren Elements to find readable TopLevelElements
    const elements: Ele[] = []
    let eles = [...document.body.children]
    console.log(eles, document.body.children)
    while (eles.length > 0) {
      const element = eles[0]
      console.log('aaa', elements, eles)
      if (element.childNodes.length === 1) {
        if (CONTAINER_LIST.includes(element.nodeName)) {
          if (READABLE_LIST.includes(element.childNodes[0].nodeName)) {
            elements.push(element)
            eles.shift()
          } else {
            eles = [...element.childNodes] as HTMLElement[]
          }
        }
      } else if (element.childNodes.length > 1) {
        const filtered = [...element.childNodes].reduce(
          (acc, el) => {
            if (IGNORE_LIST.includes(el.nodeName)) return acc
            ;(READABLE_LIST.includes(el.nodeName)
              ? acc.readables
              : acc.containers
            ).push(el)
            return acc
          },
          {
            readables: [] as Ele[],
            containers: [] as Ele[],
          },
        )
        elements.push(...filtered.readables)
        eles.push(...(filtered.containers as HTMLElement[]))
        eles.shift()
      } else if (element.childNodes.length === 0) {
        eles.shift()
      }
    }

    return elements
  }, [])

  return parsedElements
}
