'use client'
import {useSoduku} from '@/context/Soduku'

import {Grid} from './Grid'
import {Controls} from './Controls'
import {cx} from '@/other/exports'
import {useCallback, useEffect} from 'react'

function SodukuComp({rating}: {rating?: string}) {
  const [{rawData}, dispatch] = useSoduku()

  const onkeydown = (e: KeyboardEvent) => {
    const nKey = Number(e.key)
    // console.log(e, (e.ctrlKey || e.metaKey) && e.key === 'z')
    if (nKey >= 1 && nKey <= 9) {
      dispatch({type: 'key', payload: nKey})
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      dispatch({type: 'key', payload: null})
    } else if (e.key === 'Escape') {
      dispatch({type: 'select', payload: undefined})
    } else if (
      e.shiftKey &&
      (e.ctrlKey || e.metaKey) &&
      e.key.toLowerCase() === 'z'
    ) {
      console.log('redo')
      dispatch({type: 'key', payload: 'redo'})
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      console.log('undo')
      dispatch({type: 'key', payload: 'undo'})
    }
  }

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
          <Grid key={`grid-${i}`} gridIndex={i} />
        ))}
      </section>
      <section
        aria-label="soduku controls"
        className={cx(
          'p-1 bg-eerie-black-900 dark:bg-eerie-black-800',
          'rounded border-[3px] border-eerie-black-300 dark:border-eerie-black-700',
        )}
      >
        {rawData?.data?.length > 0 && (
          <div className="flex justify-between px-2 pt-2 pb-1.5">
            <h3 className="text-rich-black-100 font-extralight">
              Rating: {rawData.data[0].rating}
            </h3>
            <h3 className="text-rich-black-100 font-extralight">
              Total: {rawData.total}
            </h3>
          </div>
        )}

        <Controls variant="keypad" rating={rating} />
      </section>
    </div>
  )
}

export default SodukuComp
