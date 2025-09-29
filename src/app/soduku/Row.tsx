'use client'
import type {SodukuNumbers} from '@/context/Soduku'
import {Cell} from './Cell'

export function Row({boxIndex}: {boxIndex: number}) {
  return (
    <div className="border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value, i) => (
        <Cell key={`baby-cell-${i}`} boxIndex={boxIndex} cellIndex={i} />
      ))}
    </div>
  )
}
