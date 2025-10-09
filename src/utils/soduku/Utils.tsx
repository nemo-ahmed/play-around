'use client'
import {SodukuNumbers} from '@/types/soduku'
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

export const getRowIndex = ({
  gridIndex,
  cellIndex,
}: {
  gridIndex: number
  cellIndex: number
}) => Math.floor(cellIndex / 3) + Math.floor(gridIndex / 3) * 3

export function getColIndex({
  gridIndex,
  cellIndex,
}: {
  gridIndex: number
  cellIndex: number
}) {
  const res = Math.ceil((((gridIndex + 1) % 3) * 3) / 3)
  const resCell = Math.floor((cellIndex + 1) % 3)
  return (
    3 * (res === 0 ? 3 : res) -
    (resCell % 3 === 0 ? resCell : Math.abs(resCell - 3)) -
    // ? to bring the value back to the array index
    1
  )
}

export const validateSodukuValue = (
  arr: Nullish<SodukuNumbers>[],
  value: Nullish<SodukuNumbers>,
) => arr.filter(n => n === value).length > 1

export const isSodukuNumber = (n: number | string | null): boolean =>
  n !== null && /[1-9]/.test(`${n}`)

export const validateSodukuLines = (n: Nullish<SodukuNumbers>[][]) =>
  !n.flat().includes(null) &&
  /(123456789){8}/.test(
    structuredClone(n as SodukuNumbers[][])
      .map(x => x.sort((a, b) => a - b).join(''))
      .join(''),
  )

const iconStyles = 'flex items-center justify-center size-full'
export const DYNAMIC_NUMBERS = {
  1: (
    <PiNumberOneBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  2: (
    <PiNumberTwoBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  3: (
    <PiNumberThreeBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  4: (
    <PiNumberFourBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  5: (
    <PiNumberFiveBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  6: (
    <PiNumberSixBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  7: (
    <PiNumberSevenBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  8: (
    <PiNumberEightBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
  9: (
    <PiNumberNineBold
      size="100%"
      aria-hidden
      className={iconStyles}
      fill="inherit"
    />
  ),
}
