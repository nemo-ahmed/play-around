'use client'
import {useSoduku} from '@/context/Soduku'

import {Row} from './Row'
import {NumbersCell} from './Controls'
import {cx} from '@/other/exports'
import {validateSodukuLines} from '@/utils/Soduku'
import {useEffect} from 'react'

const SODUKU_SOLVED_LENGTH = 81

function SodukuComp({rating}: {rating?: string}) {
  const {rawData: data, state, submitResult} = useSoduku()

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

  return (
    <div className="h-[calc(100dvh-120px)] flex items-center justify-around flex-wrap">
      <section
        className={cx(
          'size-[60dvh] relative grid grid-cols-3 grid-rows-3',
          'border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700',
          ' bg-eerie-black-800',
        )}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} />
        ))}
      </section>
      <div
        className={cx(
          'p-1 bg-platinum-400',
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
      </div>
    </div>
  )
}

export default SodukuComp
