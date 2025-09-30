'use client'
import {SodukuNumbers, useSoduku} from '@/context/Soduku'

import {Row} from './Row'
import {NumbersCell} from './Controls'
import {cx} from '@/other/exports'
import {validateSodukuLines} from '@/utils/Soduku'
import {useCallback, useEffect, useState} from 'react'

const SODUKU_SOLVED_LENGTH = 81

function SodukuComp({rating}: {rating?: string}) {
  const {
    rawData: data,
    state,
    submitResult,
    onSelectChange,
    selected,
    onChange,
    givenRef,
  } = useSoduku()

  const [pressedKey, setPressedKey] = useState<number | null>(null)

  useEffect(() => {
    if (state.count >= SODUKU_SOLVED_LENGTH) {
      const submittableRow = JSON.parse(JSON.stringify(state.rowState))
      const submittableCol = JSON.parse(JSON.stringify(state.colState))
      const submittableGrid = JSON.parse(JSON.stringify(state.gridState))

      if (
        validateSodukuLines(submittableRow) &&
        validateSodukuLines(submittableCol) &&
        validateSodukuLines(submittableGrid)
      )
        submitResult(rating)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count, submitResult])

  function onBlur() {
    onSelectChange(undefined)
  }
  console.log(selected)

  useEffect(() => {
    if (!selected) return

    const {boxIndex, cellIndex} = selected
    const cellKey = `${boxIndex}-${cellIndex}`
    const isGiven = givenRef?.[cellKey]
    if (isGiven) return
    onChange({boxIndex, cellIndex, value: pressedKey as SodukuNumbers | null})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedKey])

  const onkeydown = useCallback(
    (e: KeyboardEvent) => {
      const nKey = Number(e.key)

      if (nKey >= 1 && nKey <= 9) {
        console.log(nKey)
        setPressedKey(nKey)
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        setPressedKey(null)
      } else if (e.key === 'Escape') {
        console.log(e.key)
        onBlur()
      }
    },
    [onBlur],
  )

  useEffect(() => {
    window.addEventListener('keydown', onkeydown)
    console.log('added')
    return () => {
      console.log('removed')
      window.removeEventListener('keydown', onkeydown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="h-[calc(100dvh-120px)] flex items-center justify-around flex-wrap overflow-auto"
      aria-label="Soduku group"
    >
      <section
        className={cx(
          'size-[60dvh] relative grid grid-cols-3 grid-rows-3',
          'border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700',
          'bg-eerie-black-900 dark:bg-eerie-black-800',
        )}
        aria-label="Soduku puzzle"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} />
        ))}
      </section>
      <section
        aria-label="soduku controls"
        className={cx(
          'p-1 bg-eerie-black-900 dark:bg-eerie-black-800',
          'rounded border-[3px] border-eerie-black-300 dark:border-eerie-black-700',
        )}
      >
        {data && (
          <div className="flex justify-between px-2 pt-2 pb-1.5">
            <h3 className="text-rich-black-100 font-extralight">
              Rating: {data.data[0].rating}
            </h3>
            <h3 className="text-rich-black-100 font-extralight">
              Total: {data.total}
            </h3>
          </div>
        )}

        <NumbersCell variant="keypad" rating={rating} />
      </section>
    </div>
  )
}

export default SodukuComp
