'use client'
import {useSoduku} from '@/context/Soduku'

import {Row} from './Row'
import {NumbersCell} from './NumbersCell'
import {cx} from '@/other/exports'
import {SodukuTypeReturn} from '@/types/soduku'

function SodukuComp({data}: {data: SodukuTypeReturn}) {
  const {state} = useSoduku()
  return (
    <div className="h-[calc(100dvh-120px)] flex items-center justify-around flex-wrap">
      <section
        className={cx(
          'size-[60dvh] relative grid grid-cols-3 grid-rows-3',
          'border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700',
          ' bg-eerie-black-800 dark:bg-eerie-black-800',
        )}
      >
        {state.gridState.map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} grid={grid} />
        ))}
      </section>
      <div className="border-collapse border border-eerie-black-300 dark:border-eerie-black-700 bg-eerie-black-800 dark:bg-eerie-black-800">
        <NumbersCell variant="keypad" data={data} />
      </div>
    </div>
  )
}

export default SodukuComp
