'use client'
import {useEffect, useEffectEvent, useState} from 'react'

import type {Ele} from '@/types/typings'

const CONTAINER_LIST = ['DIV', 'SECTION', 'ARTICLE', 'MAIN']
const READABLE_LIST = ['P', 'CODE', 'BLOCKQUOTE']

export function useGetTopLevelReadableElementsOnPage(): Ele[] {
  const [parsedElements, setParsedElements] = useState<Ele[]>([])
  const effectEvent = useEffectEvent(() => {
    let eles = [
      ...(document.getElementsByTagName('main').item(0)?.children || []),
    ]
    // ? Iterate on body subChildren Elements to find readable TopLevelElements
    const elements: Ele[] = []
    // ? This is for consistence. as react-query devtool replaces the content
    while (eles.length > 0) {
      const element = eles[0]
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

    setParsedElements(elements)
  })

  useEffect(() => {
    if (typeof document === 'undefined') return
    effectEvent()
  }, [])

  return parsedElements
}
