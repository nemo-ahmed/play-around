'use client'
import type {Ele} from '@/types/typings'
import {useMemo} from 'react'

const CONTAINER_LIST = ['DIV', 'SECTION', 'ARTICLE', 'MAIN']
const READABLE_LIST = ['P', 'CODE', 'BLOCKQUOTE']

export function useGetTopLevelReadableElementsOnPage(): Ele[] {
  const parsedElements = useMemo(() => {
    if (typeof document === 'undefined') {
      return []
    }
    // ? Iterate on body subChildren Elements to find readable TopLevelElements
    const elements: Ele[] = []
    // ? This is for consistence. as react-query devtool replaces the content
    let eles = [...(document.getElementById('body')?.children || [])]
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
            if (READABLE_LIST.includes(el.nodeName)) acc.readables.push(el)
            if (CONTAINER_LIST.includes(el.nodeName)) acc.containers.push(el)
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
