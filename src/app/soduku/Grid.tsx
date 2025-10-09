'use client'
import {useSoduku} from '@/context/soduku/Soduku'
import {Cell} from './Cell'
import Active from '@/components/ClientActivity'
import {Fragment} from 'react'

export function Grid({gridIndex}: {gridIndex: number}) {
  const [{isPlaying}] = useSoduku()

  return (
    <div
      aria-label={`grid ${gridIndex + 1}`}
      className="border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, i) => (
        <Fragment key={`cell-${i}`}>
          <Active isVisible={!isPlaying}>
            <div className="size-full border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700" />
          </Active>
          <Active isVisible={isPlaying}>
            <Cell key={`cell-${i}`} gridIndex={gridIndex} cellIndex={i} />
          </Active>
        </Fragment>
      ))}
    </div>
  )
}
