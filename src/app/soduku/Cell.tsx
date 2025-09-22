'use client'
import {useSoduku} from '@/context/Soduku'

import {Row} from './Row'
import {NumbersCell} from './NumbersCell'

function SodukuComp() {
  const {state} = useSoduku()

  return (
    <div className="flex items-center justify-around flex-wrap">
      <section
        className={
          'relative grid grid-cols-3 grid-rows-3 border-collapse border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700  bg-eerie-black-800 dark:bg-eerie-black-800 size-[50dvh]'
        }
      >
        {state.gridState.map((grid, i) => (
          <Row key={`grid-${i}`} boxIndex={i} grid={grid} />
        ))}
      </section>
      <div className="border-collapse border border-eerie-black-300 dark:border-eerie-black-700 size-[40dvh] bg-eerie-black-800 dark:bg-eerie-black-800">
        <NumbersCell variant="keypad" />
      </div>
    </div>
  )
}

export default SodukuComp
