'use client'

import {useSoduku} from '@/context/Soduku'
import {
  DYNAMIC_NUMBERS,
  getColIndex,
  getRowIndex,
  validateSodukuValue,
} from '@/utils/soduku'
import {useEffect, useState} from 'react'
import {Controls} from './Controls'
import {cx} from '@/other/exports'
import {SodukuNumbers} from '@/types/soduku'

export function Cell({
  gridIndex,
  cellIndex,
}: {
  gridIndex: number
  cellIndex: number
}) {
  const [
    {given, selected, gridState, colState, rowState, autoHints},
    dispatch,
  ] = useSoduku()

  const value = gridState[gridIndex][cellIndex]
  const [notes, setNotes] = useState<SodukuNumbers[]>([])

  const cellKey = `${gridIndex}-${cellIndex}`
  // ? This will be use to Validation. Should be quicker than before
  const colIndex = getColIndex({
    gridIndex,
    cellIndex,
  })
  const rowIndex = getRowIndex({
    gridIndex,
    cellIndex,
  })

  const hasFocus =
    selected &&
    selected.gridIndex === gridIndex &&
    selected.cellIndex === cellIndex

  function onBlur() {
    dispatch({type: 'select', payload: undefined})
  }

  const isHighlightBG =
    selected &&
    (selected.colIndex === colIndex ||
      selected.rowIndex === rowIndex ||
      selected.gridIndex === gridIndex)
  const isValueHighlighted = selected?.value && selected.value === value
  const isGiven = given?.[cellKey]
  const isFalse =
    value &&
    (validateSodukuValue(colState[colIndex], value) ||
      validateSodukuValue(rowState[rowIndex], value) ||
      validateSodukuValue(gridState[gridIndex], value))

  const commonStyles = {
    [`${!isGiven && !isFalse}`]:
      'absolute size-full fill-eerie-black-300 dark:fill-rich-black-600',
    [`${isGiven}`]:
      'absolute size-full fill-eerie-black-100 dark:fill-eerie-black-100',
    [`${!isGiven && isFalse}`]:
      'absolute size-full fill-red-700 dark:fill-red-900 bg-red-700/15 dark:bg-red-900/15 border-red-700/10 dark:border-red-900/10',
  }

  useEffect(() => {
    if (!autoHints || isGiven || typeof value === 'number') {
      setNotes([])
      return
    }

    const hints = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as SodukuNumbers[]).filter(n => {
      return (
        !gridState[gridIndex].includes(n) &&
        !colState[colIndex].includes(n) &&
        !rowState[rowIndex].includes(n)
      )
    })
    setNotes(hints)
  }, [
    autoHints,
    colIndex,
    colState,
    gridIndex,
    gridState,
    isGiven,
    rowIndex,
    rowState,
    value,
  ])

  const ariaLabel = `grid ${gridIndex + 1} row ${rowIndex + 1}, col ${colIndex + 1}, value ${value ?? 'None'} `

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
      id={`grid-${gridIndex + 1}row-${rowIndex}_col-${colIndex}`}
      tabIndex={0}
      aria-label={ariaLabel}
      role="button"
      onBlur={onBlur}
      onFocus={() => {
        dispatch({
          type: 'select',
          payload: {gridIndex, cellIndex, rowIndex, colIndex, value, isGiven},
        })

        console.log(
          'focused',
          `grid-${gridIndex + 1}row-${rowIndex}_col-${colIndex}`,
        )
      }}
    >
      {!hasFocus && !value && (
        // ? This is to prevent adding notes when focusing cell
        <button
          className="size-full absolute bg-transparent z-10"
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => {
            dispatch({
              type: 'select',
              payload: {
                gridIndex,
                cellIndex,
                rowIndex,
                colIndex,
                value,
                isGiven,
              },
            })
          }}
        />
      )}
      {typeof value === 'number' && (
        <div aria-hidden className={cx('outline-0 p-[5px]', commonStyles.true)}>
          {DYNAMIC_NUMBERS[value as NonNullable<SodukuNumbers>]}
        </div>
      )}
      {!value && (hasFocus || notes.length > 0) && (
        <div
          aria-hidden
          className={cx(
            'outline-0 data-[visible=false]:hidden',
            commonStyles.true,
          )}
        >
          <Controls
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
        </div>
      )}
    </div>
  )
}
