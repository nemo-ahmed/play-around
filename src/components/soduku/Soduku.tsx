'use client'
import {useCallback, useSyncExternalStore} from 'react'

import {useSoduku} from '@/context/soduku/Soduku'
import {cx} from '@/other/exports'

import {Controls} from './Controls'
import {Grid} from './Grid'


function SodukuComp() {
  const [{showKeyboard}, dispatch] = useSoduku()

  const onkeydown = useCallback(
    (e: KeyboardEvent) => {
      const nKey = Number(e.key)
      console.log(e.code)
      if (nKey >= 1 && nKey <= 9) {
        dispatch({type: 'key', payload: nKey})
      } else if (e.code === 'Backspace' || e.code === 'Delete') {
        dispatch({type: 'key', payload: 'delete'})
      } else if (e.code === 'Space') {
        dispatch({type: 'pause'})
      } else if (e.code === 'Escape') {
        dispatch({type: 'select', payload: undefined})
      } else if (
        e.shiftKey &&
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === 'z'
      ) {
        dispatch({type: 'key', payload: 'redo'})
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        dispatch({type: 'key', payload: 'undo'})
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const subscribe = useCallback(() => {
    if (!showKeyboard) {
      window.addEventListener('keydown', onkeydown)
      console.log('added keyboard listener')
    }
    return () => {
      console.log('removed keyboard listener')
      window.removeEventListener('keydown', onkeydown)
    }
  }, [onkeydown, showKeyboard])

  const isOnline = useSyncExternalStore(
    subscribe,
    () => {
      return navigator.onLine
    },
    () => {
      return false
    },
  )
  return (
    <div
      className="h-[calc(100dvh-120px)] flex items-center justify-around flex-wrap overflow-auto"
      aria-label="Soduku group"
    >
      <section
        className={cx(
          'size-[min(60dvh,80dvw)] relative grid grid-cols-3 grid-rows-3',
          'border-[0.5px] border-eerie-black-300 dark:border-eerie-black-700',
          'bg-eerie-black-900 dark:bg-eerie-black-800',
        )}
        aria-label="Soduku puzzle"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((grid, i) => (
          <Grid key={`grid-${i}`} gridIndex={i} />
        ))}
      </section>

      <Controls variant="keypad" isOnline={isOnline} />
    </div>
  )
}

export default SodukuComp
