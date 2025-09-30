'use client'

import {type SodukuNumbers, useSoduku} from '@/context/Soduku'
import {
  DYNAMIC_NUMBERS,
  getColIndex,
  getRowIndex,
  isSodukuNumber,
  validateSodukuValue,
} from '@/utils/Soduku'
import {useEffect, useState} from 'react'
import {NumbersCell} from './Controls'
import {cx} from '@/other/exports'

export function Cell({
  boxIndex,
  cellIndex,
}: {
  boxIndex: number
  cellIndex: number
}) {
  const {onChange, state, givenRef, selected, onSelectChange} = useSoduku()

  const value = state.gridState[boxIndex][cellIndex]
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
    selected &&
    selected.boxIndex === boxIndex &&
    selected.cellIndex === cellIndex

  function onBlur() {
    onSelectChange(undefined)
  }

  const isHighlightBG =
    selected &&
    (selected.colIndex === colIndex ||
      selected.rowIndex === rowIndex ||
      selected.boxIndex === boxIndex)
  const isValueHighlighted = selected?.value && selected.value === value
  const isGiven = givenRef?.[cellKey]
  const isFalse =
    value &&
    (validateSodukuValue(state.colState[colIndex], value) ||
      validateSodukuValue(state.rowState[rowIndex], value) ||
      validateSodukuValue(state.gridState[boxIndex], value))

  const onkeydown = (e: KeyboardEvent) => {
    const nKey = Number(e.key)

    if (nKey >= 1 && nKey <= 9) {
      if (!isGiven)
        onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!isGiven) onChange({boxIndex, cellIndex, value: null})
    } else if (e.key === 'Escape') {
      console.log(e.key)
      onBlur()
    }
  }

  useEffect(() => {
    if (!hasFocus) return
    window.addEventListener('keydown', onkeydown)
    return () => {
      window.removeEventListener('keydown', onkeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocus])

  const commonStyles = {
    [`${!isGiven && !isFalse}`]:
      'absolute size-full fill-eerie-black-300 dark:fill-rich-black-600',
    [`${isGiven}`]:
      'absolute size-full fill-eerie-black-100 dark:fill-eerie-black-100',
    [`${!isGiven && isFalse}`]:
      'absolute size-full fill-red-700 dark:fill-red-900 bg-red-700/15 dark:bg-red-900/15 border-red-700/10 dark:border-red-900/10',
  }

  const ariaLabel = `grid ${boxIndex + 1} row ${rowIndex + 1}, col ${colIndex + 1}, value ${value ?? 'None'} `
  // ? This will be a good place to use <Active /> when its launched
  return (
    <div
      className={cx(
        'relative size-full group border-[0.5px]',
        'border-eerie-black-300 dark:border-eerie-black-700',
        {
          'hover:bg-blue-950/18 dark:hover:bg-blue-950/18':
            !isHighlightBG || !hasFocus || !isValueHighlighted,
          'bg-blue-950/10 dark:bg-blue-950/10': isHighlightBG,
          'bg-blue-950/20 dark:bg-blue-950/20': hasFocus,
          'bg-blue-950/30 dark:bg-blue-950/30': isValueHighlighted,
        },
      )}
      id={`grid-${boxIndex + 1}row-${rowIndex}_col-${colIndex}`}
      aria-label={ariaLabel}
      role="textbox"
      onBlur={onBlur}
    >
      {!hasFocus && (
        // ? This is to prevent adding notes when focusing cell
        <button
          className="size-full absolute bg-transparent z-10"
          type="button"
          aria-label={ariaLabel}
          onClick={() => {
            onSelectChange({boxIndex, cellIndex, rowIndex, colIndex, value})
          }}
        />
      )}
      <div
        data-visible={isSodukuNumber(value)}
        className={cx(
          'outline-0 data-[visible=true]:hidden p-[5px]',
          commonStyles.true,
        )}
      >
        {value && DYNAMIC_NUMBERS[value]}
      </div>
      <div
        data-visible={isSodukuNumber(value)}
        className={cx(
          'outline-0 data-[visible=false]:hidden',
          commonStyles.true,
        )}
      >
        {!value && (hasFocus || notes.length > 0) && (
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
