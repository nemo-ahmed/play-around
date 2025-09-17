'use client'
import type {SodukuNumbers} from '@/context/Soduku'
import {getColIndex, getRowIndex} from '@/utils/soduku'
import {get} from 'http'
import React, {useState} from 'react'
import {
  PiNumberEightBold,
  PiNumberFiveBold,
  PiNumberFourBold,
  PiNumberNineBold,
  PiNumberOneBold,
  PiNumberSevenBold,
  PiNumberSixBold,
  PiNumberThreeBold,
  PiNumberTwoBold,
} from 'react-icons/pi'

const DYNAMIC_NUMBERS = {
  1: <PiNumberOneBold size="100%" fill="inherit" />,
  2: <PiNumberTwoBold size="100%" fill="inherit" />,
  3: <PiNumberThreeBold size="100%" fill="inherit" />,
  4: <PiNumberFourBold size="100%" fill="inherit" />,
  5: <PiNumberFiveBold size="100%" fill="inherit" />,
  6: <PiNumberSixBold size="100%" fill="inherit" />,
  7: <PiNumberSevenBold size="100%" fill="inherit" />,
  8: <PiNumberEightBold size="100%" fill="inherit" />,
  9: <PiNumberNineBold size="100%" fill="inherit" />,
}

export const NumbersCell = ({variant}: {variant: 'note' | 'keypad'}) => {
  const [selected, setSelected] = useState<SodukuNumbers[]>([])
  const cellStyles: Record<typeof variant, string> = {
    keypad:
      'size-full fill-eerie-black-500 dark:fill-eerie-black-700 hover:fill-eerie-black-400 hover:dark:fill-eerie-black-600 border-collapse border border-eerie-black-300 dark:border-eerie-black-700',
    note: "size-full fill-transparent hover:fill-eerie-black-500 hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600",
  }
  return (
    <div className="grid grid-cols-3 grid-rows-3 content-center">
      {([1, 2, 3, 4, 5, 6, 7, 8, 9] as SodukuNumbers[]).map(n => (
        <button
          key={'note-numbers-' + n}
          className={cellStyles[variant]}
          data-selected={selected.includes(n)}
          onClick={() => {
            setSelected(prev =>
              prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n],
            )
          }}
        >
          {DYNAMIC_NUMBERS[n]}
        </button>
      ))}
    </div>
  )
}

const InputCell = ({value}: {value: SodukuNumbers}) => {
  return (
    <div className="flex items-center justify-center size-full fill-eerie-black-500 dark:fill-eerie-black-600">
      {DYNAMIC_NUMBERS?.[value]}
    </div>
  )
}

function BabyCell({
  boxIndex,
  cellIndex,
  value,
}: {
  boxIndex: number
  cellIndex: number
  value: SodukuNumbers | null
}) {
  // const [value, setValue] = useState<SodukuNumbers>()

  return (
    <div
      onKeyDown={e => {
        e.stopPropagation()
        e.preventDefault()
        const nKey = Number(e.key)
        console.log(nKey, e.key)
        if (nKey >= 1 && nKey <= 9) {
          // setValue(nKey as SodukuNumbers)
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          // setValue(undefined)
        } else if (e.key === 'Escape') {
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      className={
        'group border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 bg-eerie-black-100 dark:bg-eerie-black-800'
      }
      onClick={() => {
        console.log(
          {
            col: (cellIndex % 3) + Math.floor(boxIndex / 3) * 3,
            row: Math.floor(cellIndex / 3) + Math.floor(boxIndex / 3) * 3,
          },
          ((cellIndex + 1) % 3) + Math.floor((boxIndex + 1) / 3) * 3,
          ((boxIndex + 1) % 3) + Math.floor((cellIndex + 1) / 3) * 3,
          ((cellIndex + 1) % 3) + Math.floor((cellIndex + 1) / 3) * 3,
          ((boxIndex + 1) % 3) + Math.floor((boxIndex + 1) / 3) * 3,
        )
      }}
    >
      {value !== null ? (
        <InputCell
          value={getRowIndex({boxIndex, cellIndex}) as SodukuNumbers}
        />
      ) : (
        <NumbersCell variant="note" />
      )}
    </div>
  )
}

function Row({boxIndex, row}: {boxIndex: number; row: SodukuNumbers[]}) {
  // ! 👻 Todo Shit 💩
  // ? for a better UX
  // ? Mount the number pad on cell focus
  // ? unmount it on blur
  // ? Input will be mounted while blurred

  // ? Next Step
  // ? Add highlighting logic [Better in context to freely play around in the cells without worrying about props drilling]
  // ? maxed capacity number reach
  // ? Number Pad
  // ? Dynamic styling for 3x3 boxes 😈

  return (
    <div className="border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3">
      {row.map((value, i) => (
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

function SodukuComp() {
  return (
    <div className="flex items-center justify-around size-full">
      <section className="relative grid grid-cols-3 grid-rows-3 center size-[50dvw] border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700">
        {[
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
          [0, 1, 2, 3, 4, 5, 6, 7, 8],
        ].map((row, i) => (
          <Row key={`row-${i}`} boxIndex={i} row={row as SodukuNumbers[]} />
        ))}
      </section>
      <div className="border-collapse border border-eerie-black-300 dark:border-eerie-black-700 size-[40dvh] bg-eerie-black-100 dark:bg-eerie-black-800">
        <NumbersCell variant="keypad" />
      </div>
    </div>
  )
}

export default SodukuComp
