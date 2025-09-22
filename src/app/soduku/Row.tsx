'use client'
import type {SodukuNumbers} from '@/context/Soduku'
import {BabyCell} from './BabyCell'

export function Row({
  boxIndex,
  grid,
}: {
  boxIndex: number
  grid: Nullish<SodukuNumbers>[]
}) {
  return (
    <div className="border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3">
      {grid.map((value, i) => (
        <BabyCell
          key={`baby-cell-${i}`}
          boxIndex={boxIndex}
          cellIndex={i}
          value={value}
        />
      ))}
    </div>
  )
}
