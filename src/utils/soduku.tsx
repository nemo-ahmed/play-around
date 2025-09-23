'use client'
import {SodukuNumbers} from '@/context/Soduku'
import {
  PiNumberOneBold,
  PiNumberTwoBold,
  PiNumberThreeBold,
  PiNumberFourBold,
  PiNumberFiveBold,
  PiNumberSixBold,
  PiNumberSevenBold,
  PiNumberEightBold,
  PiNumberNineBold,
} from 'react-icons/pi'

export function getRowIndex({
  boxIndex,
  cellIndex,
}: {
  boxIndex: number
  cellIndex: number
}) {
  return (Math.floor(cellIndex / 3) +
    Math.floor(boxIndex / 3) * 3) as SodukuNumbers
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

export function validateSodukuValue(
  arr: Nullish<SodukuNumbers>[],
  value: Nullish<SodukuNumbers>,
) {
  return arr.filter(n => n === value).length > 1
}

export const isSodukuNumber = (n: SodukuNumbers | string | null) =>
  n && !/[1-9]/.test(n.toString())

export const validateSodukuLine = (n: SodukuNumbers[][]) =>
  /(123456789){8}/.test(n.map(x => x.sort((a, b) => a - b).join('')).join(''))

const iconStyle = 'flex items-center justify-center size-full'
export const DYNAMIC_NUMBERS = {
  1: <PiNumberOneBold size="100%" className={iconStyle} fill="inherit" />,
  2: <PiNumberTwoBold size="100%" className={iconStyle} fill="inherit" />,
  3: <PiNumberThreeBold size="100%" className={iconStyle} fill="inherit" />,
  4: <PiNumberFourBold size="100%" className={iconStyle} fill="inherit" />,
  5: <PiNumberFiveBold size="100%" className={iconStyle} fill="inherit" />,
  6: <PiNumberSixBold size="100%" className={iconStyle} fill="inherit" />,
  7: <PiNumberSevenBold size="100%" className={iconStyle} fill="inherit" />,
  8: <PiNumberEightBold size="100%" className={iconStyle} fill="inherit" />,
  9: <PiNumberNineBold size="100%" className={iconStyle} fill="inherit" />,
}
