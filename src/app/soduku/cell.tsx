'use client'
import React, {useId, useState} from 'react'

const NumbersCell = ({id}: {id: string}) => {
  const [selected, setSelected] = useState<number[]>([])
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-0.5 border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <button
          key={id + '_' + n}
          className="size-full text-[6.5px] text-transparent hover:text-eerie-black-500 hover:dark:text-eerie-black-700 data-[selected='true']:text-eerie-black-400 data-[selected='true']:dark:text-eerie-black-600"
          data-selected={selected.includes(n)}
          onClick={() => {
            console.log(n)
            setSelected(prev =>
              prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n],
            )
          }}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

const InputCell = ({id, value}: {id: string; value: string}) => {
  return (
    <input
      type="text"
      id={id}
      min={1}
      max={9}
      value={value}
      className="bg-transparent outline-none text-[34px] w-full h-full text-center text-eerie-black-500 dark:text-eerie-black-600"
    />
  )
}

function BabyCell() {
  const [value, setValue] = useState<number>()
  const id = useId()

  return (
    <div
      onKeyDown={e => {
        e.stopPropagation()
        e.preventDefault()
        const nKey = Number(e.key)
        console.log(nKey, e.key)
        if (nKey >= 1 && nKey <= 9) {
          setValue(nKey)
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          setValue(undefined)
        } else if (e.key === 'Escape') {
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      className={
        'border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 bg-eerie-black-100 dark:bg-eerie-black-800'
      }
    >
      {value ? (
        <InputCell id={id} value={value.toString()} />
      ) : (
        <NumbersCell id={id} />
      )}
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
