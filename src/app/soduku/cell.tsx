'use client'
import React, {useId, useState} from 'react'
import {
  PiNumberEight,
  PiNumberFive,
  PiNumberFour,
  PiNumberNine,
  PiNumberOne,
  PiNumberSeven,
  PiNumberSix,
  PiNumberThree,
  PiNumberTwo,
} from 'react-icons/pi'

type OurNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const DYNAMIC_NUMBERS = {
  1: <PiNumberOne size="100%" fill="inherit" />,
  2: <PiNumberTwo size="100%" fill="inherit" />,
  3: <PiNumberThree size="100%" fill="inherit" />,
  4: <PiNumberFour size="100%" fill="inherit" />,
  5: <PiNumberFive size="100%" fill="inherit" />,
  6: <PiNumberSix size="100%" fill="inherit" />,
  7: <PiNumberSeven size="100%" fill="inherit" />,
  8: <PiNumberEight size="100%" fill="inherit" />,
  9: <PiNumberNine size="100%" fill="inherit" />,
}

const NumbersCell = ({id}: {id: string}) => {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <div className="grid grid-cols-3 grid-rows-3 content-center gap-0.5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <button
          key={id + '_' + n}
          className="size-full fill-transparent hover:fill-eerie-black-500 hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600"
          data-selected={selected.includes(n)}
          onClick={() => {
            console.log(n)
            setSelected(prev =>
              prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n],
            )
          }}
        >
          {DYNAMIC_NUMBERS[n as OurNumbers]}
        </button>
      ))}
    </div>
  )
}

const InputCell = ({id, value}: {id: string; value: OurNumbers}) => {
  return (
    // <input
    //   type="text"
    //   id={id}
    //   min={1}
    //   max={9}
    //   value={value}
    //   className="bg-transparent cursor-default outline-none text-[34px] w-full h-full text-center text-eerie-black-500 dark:text-eerie-black-600"
    // />
    <div className="flex items-center justify-center size-full fill-eerie-black-500 dark:fill-eerie-black-600">
      {DYNAMIC_NUMBERS?.[value]}
    </div>
  )
}

function BabyCell() {
  const [value, setValue] = useState<OurNumbers>()
  const [isFocused, setIsFocused] = useState(false)
  const id = useId()

  return (
    <div
      onKeyDown={e => {
        e.stopPropagation()
        e.preventDefault()
        const nKey = Number(e.key)
        console.log(nKey, e.key)
        if (nKey >= 1 && nKey <= 9) {
          setValue(nKey as OurNumbers)
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          setValue(undefined)
        } else if (e.key === 'Escape') {
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      className={
        'group border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 bg-eerie-black-100 dark:bg-eerie-black-800'
      }
    >
      {value ? <InputCell id={id} value={value} /> : <NumbersCell id={id} />}
    </div>
  )
}

function Cell() {
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
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <BabyCell key={`baby-cell-${n}`} />
      ))}
    </div>
  )
}

export default Cell
