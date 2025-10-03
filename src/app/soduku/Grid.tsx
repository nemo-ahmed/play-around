'use client'
import {Cell} from './Cell'

export function Grid({gridIndex}: {gridIndex: number}) {
  return (
    <div
      aria-label={`grid ${gridIndex + 1}`}
      className="border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, i) => (
        <Cell key={`baby-cell-${i}`} gridIndex={gridIndex} cellIndex={i} />
      ))}
    </div>
  )
}
