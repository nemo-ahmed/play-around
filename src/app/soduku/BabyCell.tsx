'use client'
import {type SodukuNumbers, useSoduku} from '@/context/Soduku'
import {
  DYNAMIC_NUMBERS,
  getColIndex,
  getRowIndex,
  isSodukuNumber,
  validateSodukuValue,
} from '@/utils/soduku'
import {useEffect, useState} from 'react'
import {NumbersCell} from './NumbersCell'
import {cx} from '@/other/exports'

export function BabyCell({
  boxIndex,
  cellIndex,
  value,
}: {
  boxIndex: number
  cellIndex: number
  value: Nullish<SodukuNumbers>
}) {
  const {onChange, state, givenRef, selected, onSelectChange} = useSoduku()

  const [notes, setNotes] = useState<SodukuNumbers[]>([])

  const cellKey = `${boxIndex}-${cellIndex}`
  // ? This will be use to Validation. Should be quicker than before
  const colIndex = getColIndex({
    boxIndex,
    cellIndex,
  })
  const rowIndex = getRowIndex({
    boxIndex,
    cellIndex,
  })

  const hasFocus =
    selected && selected.colIndex === colIndex && selected.rowIndex === rowIndex

  function onBlur() {
    onSelectChange(undefined)
  }

  const isHighlightBG =
    selected &&
    (selected.colIndex === colIndex || selected.rowIndex === rowIndex)
  const isValueHighlighted = selected?.value && selected.value === value
  const isGiven = givenRef?.[cellKey]
  const isFalse =
    value &&
    (validateSodukuValue(state.colState[colIndex], value) ||
      validateSodukuValue(state.rowState[rowIndex], value) ||
      validateSodukuValue(state.gridState[boxIndex], value))

  const onkeydown = (e: KeyboardEvent) => {
    if (isGiven) return
    const nKey = Number(e.key)

    if (nKey >= 1 && nKey <= 9) {
      onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      onChange({boxIndex, cellIndex, value: null})
    } else if (e.key === 'Escape') {
      onBlur()
    }
  }
  useEffect(() => {
    if (isGiven || !hasFocus) return
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocus])

  const keyStyles = cx({
    'absolute size-full fill-eerie-black-500 dark:fill-eerie-black-600':
      !isGiven && !isFalse,
    'absolute size-full fill-eerie-black-500/60 dark:fill-eerie-black-600/60':
      isGiven,
    'absolute size-full fill-red-600/90 bg-red-600/20 border-red-600/90':
      !isGiven && isFalse,
  })

  // ? This will be a good place to use <Active /> when its launched
  return (
    <div
      className={cx(
        'relative size-full group border-collapse border-[0.5px]',
        'border-eerie-black-300 dark:border-eerie-black-700',
        'hover:bg-eerie-black/18 dark:hover:bg-eerie-black/18',
        {
          'bg-eerie-black/10': isHighlightBG,
          'bg-eerie-black/18': hasFocus,
          'bg-eerie-black/30': isValueHighlighted,
        },
      )}
      role="textbox"
      onBlur={() => {
        onBlur()
      }}
    >
      {!hasFocus && (
        // ? This is to prevent adding notes when focusing cell
        <button
          className="size-full absolute bg-transparent z-10"
          type="button"
          onClick={() => {
            onSelectChange({boxIndex, cellIndex, rowIndex, colIndex, value})
          }}
        />
      )}
      <div
        data-visible={isSodukuNumber(value)}
        className={cx('outline-0 data-[visible=true]:hidden', keyStyles)}
      >
        {value && DYNAMIC_NUMBERS[value]}
      </div>
      <div
        data-visible={isSodukuNumber(value)}
        className={cx('outline-0 data-[visible=false]:hidden', keyStyles)}
      >
        {(hasFocus || notes.length > 0) && (
          <NumbersCell
            variant="note"
            onChange={n => {
              if (hasFocus)
                setNotes(
                  prev =>
                    (prev = prev.includes(n)
                      ? prev.filter(x => x !== n)
                      : prev.concat([n])),
                )
            }}
            selected={notes}
          />
        )}
      </div>
    </div>
  )
}
