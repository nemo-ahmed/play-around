'use client'
import {SodukuNumbers} from '@/context/Soduku'

export function getRowIndex({
  boxIndex,
  cellIndex,
}: {
  boxIndex: number
  cellIndex: number
}) {
  return (Math.floor(cellIndex / 3) +
    Math.floor(boxIndex / 3) * 3 +
    1) as SodukuNumbers
}

export function getColIndex({
  boxIndex,
  cellIndex,
}: {
  boxIndex: number
  cellIndex: number
}) {
  const res = Math.ceil((((boxIndex + 1) % 3) * 3) / 3)
  const resCell = Math.floor((cellIndex + 1) % 3)
  return (3 * (res === 0 ? 3 : res) -
    (resCell % 3 === 0 ? resCell : Math.abs(resCell - 3)) -
    // ? to bring the value back to the array index
    1) as SodukuNumbers
}
