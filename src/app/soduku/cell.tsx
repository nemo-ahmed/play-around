'use client'
import {SodukuCell, useSoduku, type SodukuNumbers} from '@/context/Soduku'
import {useEffect, useState} from 'react'
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

const iconStyle = 'flex items-center justify-center size-full'

const DYNAMIC_NUMBERS = {
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

function BabyCell({
  boxIndex,
  cellIndex,
  value,
  isGiven,
  isFalse,
}: {
  boxIndex: number
  cellIndex: number
  value: SodukuNumbers | null
  isGiven: boolean
  isFalse: boolean
}) {
  const {onChange} = useSoduku()
  const keyStyles = {
    true: ' fill-eerie-black-500 dark:fill-eerie-black-600 border-eerie-black-300 dark:border-eerie-black-700',
    [`${isGiven}`]:
      ' fill-eerie-black-500/60 dark:fill-eerie-black-600/60 border-eerie-black-300 dark:border-eerie-black-700',
    [`${isFalse}`]: ' fill-red-600/90 bg-red-600/20 border-red-600/90',
  }
  console.log({
    boxIndex,
    cellIndex,
  })

  if (value) {
    return (
      <button
        onKeyDown={e => {
          e.preventDefault()
          e.stopPropagation()
          const nKey = Number(e.key)
          console.log(nKey, e.key, {
            boxIndex,
            cellIndex,
            value: nKey as SodukuNumbers,
          })
          if (nKey >= 1 && nKey <= 9) {
            onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
          } else if (e.key === 'Backspace' || e.key === 'Delete') {
            onChange({boxIndex, cellIndex, value: null})
          } else if (e.key === 'Escape') {
            ;(e.target as HTMLInputElement).blur()
          }
        }}
        className={'group border-collapse border-[0.5px]' + keyStyles.true}
      >
        {value !== null ? (
          DYNAMIC_NUMBERS[value]
        ) : (
          <NumbersCell variant="note" />
        )}
      </button>
    )
  }
  return (
    <div
      onKeyDown={e => {
        console.log(e.key, {
          boxIndex,
          cellIndex,
          isGiven,
        })
        e.preventDefault()
        e.stopPropagation()
        if (isGiven) return

        const nKey = Number(e.key)
        if (nKey >= 1 && nKey <= 9) {
          onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          onChange({boxIndex, cellIndex, value: null})
        } else if (e.key === 'Escape') {
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      className={'group border-collapse border-[0.5px]' + keyStyles.true}
    >
      <NumbersCell variant="note" />
    </div>
  )
}

function Row({boxIndex, grid}: {boxIndex: number; grid: SodukuCell[]}) {
  return (
    <div className="border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700 grid grid-cols-3 grid-rows-3">
      {grid.map((value, i) => (
        <BabyCell
          key={`baby-cell-${i}`}
          boxIndex={boxIndex}
          cellIndex={i}
          value={value.value}
          isGiven={value.isGiven}
          isFalse={value.isFalse}
        />
      ))}
    </div>
  )
}

function SodukuComp() {
  const {state} = useSoduku()
  const [size, setSize] = useState('')
  useEffect(() => {
    if (typeof screen !== 'undefined')
      setSize(
        screen.availWidth > screen.availHeight
          ? ' size-[50dvw]'
          : ' size-[50dhw]',
      )
  }, [])

  return (
    <div className="flex items-center justify-around size-full">
      <section
        className={
          'relative grid grid-cols-3 grid-rows-3 center border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700  bg-eerie-black-100 dark:bg-eerie-black-800' +
          size
        }
      >
        {state.map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} grid={grid} />
        ))}
      </section>
      <div className="border-collapse border border-eerie-black-300 dark:border-eerie-black-700 size-[40dvh] bg-eerie-black-100 dark:bg-eerie-black-800">
        <NumbersCell variant="keypad" />
      </div>
    </div>
  )
}

export default SodukuComp
