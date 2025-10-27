'use client'

import {useEffect, useState} from 'react'

import Active from '@/components/ClientActivity'
import {useSoduku} from '@/context/soduku/Soduku'
import {cx} from '@/other/exports'
import {SodukuNumbers} from '@/types/soduku'
import {
  DYNAMIC_NUMBERS,
  getColIndex,
  getGivenKey,
  getRowIndex,
  isSodukuNumber,
  validateSodukuValue,
} from '@/utils/soduku'

import {Controls} from './Controls'

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
  const [isMouseInside, setIsMouseInside] = useState(false)

  const cellKey = getGivenKey({gridIndex, cellIndex})
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
    if (isMouseInside) return
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
    if (!autoHints || isGiven || isSodukuNumber(value)) {
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
      onMouseEnter={() => {
        setIsMouseInside(true)
      }}
      onMouseLeave={() => {
        setIsMouseInside(false)
      }}
    >
      <Active isVisible={!hasFocus}>
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
      </Active>
      <Active isVisible={typeof value === 'number'}>
        <div aria-hidden className={cx('outline-0 p-[5px]', commonStyles.true)}>
          {DYNAMIC_NUMBERS[value as NonNullable<SodukuNumbers>]}
        </div>
      </Active>
      <Active isVisible={(hasFocus && value === null) || notes.length > 0}>
        <div aria-hidden className={cx(commonStyles.true)}>
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
      </Active>
    </div>
  )
}
