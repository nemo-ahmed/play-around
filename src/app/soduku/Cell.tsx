'use client'
import {useSoduku} from '@/context/Soduku'

import {Row} from './Row'
import {NumbersCell} from './NumbersCell'
import {cx} from '@/other/exports'
import {SodukuTypeReturn} from '@/types/soduku'
import {validateSodukuLine} from '@/utils/soduku'
import {useCallback, useEffect} from 'react'

const SODUKU_SOLVED_LENGTH = 81

function SodukuComp({data}: {data: SodukuTypeReturn}) {
  const {state} = useSoduku()

  const submitResult = useCallback(
    async (solution: string) => {
      console.log('submitting', solution)
      await fetch('http://localhost:3000/api/soduku/submit', {
        body: JSON.stringify({
          id: data.data[0].id,
          soduku: solution,
          rating: data.data[0].rating,
        }),
        method: 'POST',
      })
    },
    [data.data],
  )

  useEffect(() => {
    if (state.count >= SODUKU_SOLVED_LENGTH) {
      const submittableRow = state.rowState

      const str = submittableRow
      if (validateSodukuLine(str)) submitResult(str.flat().join(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count, submitResult])

  return (
    <div className="h-[calc(100dvh-120px)] flex items-center justify-around flex-wrap">
      <section
        className={cx(
          'size-[60dvh] relative grid grid-cols-3 grid-rows-3',
          'border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700',
          ' bg-eerie-black-800',
        )}
      >
        {state.gridState.map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} grid={grid} />
        ))}
      </section>
      <div
        className={cx(
          'border-collapse p-1 bg-platinum-400',
          'rounded-2xl border-[3px] border-eerie-black-300 dark:border-eerie-black-700',
        )}
      >
        {data && (
          <div className="flex justify-between px-2 pt-2 pb-1.5">
            <h3 className="text-rich-black-100">
              Rating: {data.data[0].rating}
            </h3>
            <h3 className="text-rich-black-100">Total: {data.total}</h3>
          </div>
        )}
        <div
          className={cx(
            'bg-eerie-black-800 dark:bg-eerie-black-800',
            'rounded-b-2xl border-2 border-eerie-black-300 dark:border-eerie-black-700',
          )}
        >
          <NumbersCell variant="keypad" />
        </div>
      </div>
    </div>
  )
}

export default SodukuComp
