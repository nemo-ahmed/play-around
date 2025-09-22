'use client'
import {type SodukuNumbers, useSoduku} from '@/context/Soduku'
import {
  DYNAMIC_NUMBERS,
  getColIndex,
  getRowIndex,
  isSodukuNumber,
  validateSodukuValue,
} from '@/utils/soduku'
import {useRef, useState, useEffect, useTransition} from 'react'
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
  const {onChange, state, givenRef} = useSoduku()

  const containerRef = useRef<HTMLButtonElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)
  const [notes, setNotes] = useState<SodukuNumbers[]>([])
  const [hasFocus, setHasFocus] = useState(false)

  const [, startTransition] = useTransition()

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
  const isGiven = givenRef?.[cellKey]
  const isFalse =
    value &&
    (validateSodukuValue(state.colState[colIndex], value) ||
      validateSodukuValue(state.rowState[rowIndex], value) ||
      validateSodukuValue(state.gridState[boxIndex], value))

  // ? on outside clickish
  const isOutside = containerRef.current?.contains(document.activeElement)
  useEffect(() => {
    if (isOutside) return
    containerRef.current?.blur()
  }, [isOutside])

  useEffect(() => {
    console.log(hasFocus)
    if (hasFocus) return
    if (typeof value === 'number') {
      console.log('btnRef.current?.focus')
      btnRef.current?.focus()
    } else {
      console.log('notesRef.current?.focus')
      notesRef.current?.focus()
    }
  }, [hasFocus, value])

  const keyStyles = cx({
    'absolute size-full fill-eerie-black-500 dark:fill-eerie-black-600':
      !isGiven && !isFalse,
    'absolute size-full fill-eerie-black-500/60 dark:fill-eerie-black-600/60':
      isGiven,
    'absolute size-full fill-red-600/90 bg-red-600/20 border-red-600/90':
      !isGiven && isFalse,
  })

  // if (!document.activeElement?.isSameNode(notesRef.current) && !value) {
  //   notesRef.current?.focus()
  // } else if (!document.activeElement?.isSameNode(btnRef.current) && value) {
  //   btnRef.current?.focus()
  // }

  // ? This will be a good place to use <Active /> when its lunched
  return (
    <div
      ref={e => {
        if (e) {
        }
      }}
      className={cx(
        'relative size-full group border-collapse border-[0.5px]',
        'border-eerie-black-300 dark:border-eerie-black-700',
        'hover:bg-eerie-black/18 dark:hover:bg-eerie-black/18 focus-within:bg-eerie-black/18',
      )}
      data-focus={hasFocus || undefined}
      onBlurCapture={() => {
        setHasFocus(false)
      }}
    >
      {!hasFocus && (
        <button
          className="size-full absolute bg-transparent z-10"
          type="button"
          onClick={() => {
            setHasFocus(true)
          }}
        />
      )}
      <button
        ref={btnRef}
        data-visible={isSodukuNumber(value)}
        onKeyDown={e => {
          e.preventDefault()
          e.stopPropagation()
          if (isGiven) return
          const nKey = Number(e.key)

          if (nKey >= 1 && nKey <= 9) {
            onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
          } else if (e.key === 'Backspace' || e.key === 'Delete') {
            onChange({boxIndex, cellIndex, value: null})
            startTransition(() => {
              notesRef.current?.focus()
            })
          } else if (e.key === 'Escape') {
            setHasFocus(false)
          }
        }}
        className={cx('outline-0 data-[visible=true]:hidden', keyStyles)}
      >
        {value && DYNAMIC_NUMBERS[value]}
      </button>
      <div
        ref={notesRef}
        onClick={() => {
          if (typeof value === 'number') btnRef.current?.focus()
          else notesRef.current?.focus()
          setHasFocus(true)
        }}
        data-visible={isSodukuNumber(value)}
        onKeyDown={e => {
          e.preventDefault()
          e.stopPropagation()
          if (isGiven) return
          const nKey = Number(e.key)

          if (nKey >= 1 && nKey <= 9) {
            onChange({boxIndex, cellIndex, value: nKey as SodukuNumbers})
            startTransition(() => {
              btnRef.current?.focus()
            })
          } else if (e.key === 'Backspace' || e.key === 'Delete') {
            onChange({boxIndex, cellIndex, value: null})
          } else if (e.key === 'Escape') {
            setHasFocus(false)
          }
        }}
        className={cx('outline-0 data-[visible=false]:hidden', keyStyles)}
      >
        {(hasFocus || notes.length > 0) && (
          <NumbersCell
            variant="note"
            onChange={n => {
              console.log(hasFocus)
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
