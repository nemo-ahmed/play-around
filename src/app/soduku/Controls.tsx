'use client'
import IconButton from '@/components/IconButton'
import {useSoduku} from '@/context/Soduku'
import useRandomSoduku from '@/hooks/useRandomSoduku'
import {cx} from '@/other/exports'
import {queryClient} from '@/other/queryclient'
import type {SodukuNumbers} from '@/types/soduku'
import {DYNAMIC_NUMBERS} from '@/utils/soduku'
import {useEffect, useState} from 'react'
import {BsArrowRepeat, BsEraser} from 'react-icons/bs'
import {IoArrowRedoOutline, IoArrowUndoOutline} from 'react-icons/io5'
import {LiaLightbulb} from 'react-icons/lia'
import {VscDebugStart} from 'react-icons/vsc'

export const Controls = ({
  variant,
  onChange,
  rating,
  selected,
}: {
  variant: 'note' | 'keypad'
  onChange?: (n: SodukuNumbers) => void
  rating?: string
  selected?: SodukuNumbers[]
}) => {
  const [
    {selected: selectedCell, given, rawData, history, isPlaying, autoHints},
    dispatch,
  ] = useSoduku()

  const {data, isLoading, refetch} = useRandomSoduku({
    rating,
  })

  const [shouldDisplayKeypad, setShouldDisplayKeypad] = useState(false)

  const cellStyles: Record<typeof variant, string> = {
    keypad:
      'p-4 size-full fill-eerie-black-500 dark:fill-eerie-black-700 not-disabled:hover:fill-eerie-black-400 not-disabled:hover:dark:fill-eerie-black-600 border-2 border-eerie-black-300 dark:border-eerie-black-700',
    note: "size-full fill-transparent not-disabled:hover:fill-eerie-black-500 not-disabled:hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600",
  }

  useEffect(() => {
    setShouldDisplayKeypad(
      !(
        window.navigator.userAgent.includes('Windows') ||
        window.navigator.userAgent.includes('Mac')
      ),
    )
  }, [])

  return (
    <div
      className={cx({
        'w-[40dvh]': variant === 'keypad',
        'size-full': variant === 'note',
      })}
    >
      {(variant === 'note' || shouldDisplayKeypad) && (
        <div
          className={cx('grid grid-cols-3 grid-rows-3', {
            'size-[40dvh]': variant === 'keypad',
            'size-full': variant === 'note',
          })}
        >
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as SodukuNumbers[]).map(n => (
            <button
              key={'note-numbers-' + n}
              className={cx(cellStyles[variant], {
                'rounded-tr': n === 3,
                'rounded-tl': n === 1,
              })}
              aria-describedby={
                selectedCell
                  ? `grid-${selectedCell.gridIndex + 1}_row-${selectedCell.rowIndex + 1}_col-${selectedCell.colIndex + 1}`
                  : 'none'
              }
              aria-label={
                selectedCell
                  ? `set row ${selectedCell.rowIndex + 1} col ${selectedCell.colIndex + 1} to be ${n} inside of grid ${selectedCell.gridIndex + 1}`
                  : `select a cell`
              }
              data-selected={selected?.includes(n)}
              onClick={() => {
                if (variant === 'keypad' && selectedCell) {
                  dispatch({
                    type: 'key',
                    payload: n,
                  })
                }
                onChange?.(n)
              }}
              disabled={
                !selectedCell ||
                given[`${selectedCell.gridIndex}-${selectedCell.cellIndex}`]
              }
            >
              {DYNAMIC_NUMBERS[n]}
            </button>
          ))}
        </div>
      )}
      {variant === 'keypad' && (
        <div className="flex flex-col bg-outer-space-800 dark:bg-eerie-black-600 border border-eerie-black-300 dark:border-eerie-black-700 rounded-b">
          <IconButton
            type="button"
            onClick={() => {
              if (data) dispatch({type: 'start', payload: data})
            }}
            onMouseEnter={() => {
              if (data && rawData.data.at(0) === data.data.at(0)) {
                queryClient.invalidateQueries({queryKey: ['soduku']})
                refetch({cancelRefetch: false})
              }
            }}
            aria-label="Start a new game"
            label="new game"
            disabled={isLoading}
          >
            <VscDebugStart aria-hidden className="size-full" />
          </IconButton>
          <div
            aria-label="divider"
            aria-hidden
            className="h-0.5 bg-eerie-black-300 dark:bg-eerie-black-700"
          />
          <IconButton
            type="button"
            onClick={() => {
              dispatch({type: 'toggle-auto-hints'})
            }}
            aria-hidden
            isActive={autoHints}
            label={`${autoHints ? 'Disable' : 'Enable'} auto notes`}
            disabled={!isPlaying}
          >
            <LiaLightbulb aria-hidden className="size-full" />
          </IconButton>
          <div
            aria-label="divider"
            aria-hidden
            className="h-0.5 bg-eerie-black-300 dark:bg-eerie-black-700"
          />
          <div
            className={cx(
              'flex h-8',
              // ? For some reason without this the edges is not aligned
              'm-[-1]',
            )}
          >
            <IconButton
              type="button"
              onClick={() => {
                dispatch({
                  type: 'key',
                  payload: 'undo',
                })
              }}
              aria-label="Undo last action"
              label="Undo"
              disabled={!isPlaying || history.undo.length < 1}
            >
              <IoArrowUndoOutline aria-hidden className="size-full" />
            </IconButton>
            <div
              aria-label="divider"
              aria-hidden
              className="w-0.5 bg-eerie-black-300 dark:bg-eerie-black-700"
            />
            <IconButton
              type="button"
              aria-label="Redo last removed action"
              onClick={() => {
                dispatch({
                  type: 'key',
                  payload: 'redo',
                })
              }}
              label="Redo"
              disabled={!isPlaying || history.redo.length < 1}
            >
              <IoArrowRedoOutline aria-hidden className="size-full" />
            </IconButton>
          </div>
          <div
            aria-label="divider"
            aria-hidden
            className="h-0.5 bg-eerie-black-300 dark:bg-eerie-black-700"
          />
          <div
            className={cx(
              'flex h-8',
              // ? For some reason without this the edges is not aligned
              'm-[-1]',
            )}
          >
            <IconButton
              type="button"
              onClick={() => {
                dispatch({
                  type: 'reset',
                })
              }}
              aria-label="reset game"
              label="Reset game"
              disabled={!isPlaying}
            >
              <BsArrowRepeat aria-hidden className="size-full" />
            </IconButton>
            <div
              aria-label="divider"
              aria-hidden
              className="w-0.5 bg-eerie-black-300 dark:bg-eerie-black-700"
            />
            <IconButton
              type="button"
              aria-describedby={
                selectedCell
                  ? `grid-${selectedCell.gridIndex + 1}_row-${selectedCell.rowIndex + 1}_col-${selectedCell.colIndex + 1}`
                  : 'none'
              }
              aria-hidden
              aria-label={
                selectedCell
                  ? `remove value of row ${selectedCell.rowIndex + 1} col ${selectedCell.colIndex + 1} inside of grid ${selectedCell.gridIndex + 1}`
                  : `select a cell`
              }
              label="erase"
              onClick={() => {
                if (variant === 'keypad' && selectedCell) {
                  dispatch({
                    type: 'key',
                    payload: null,
                  })
                }
              }}
              disabled={
                !isPlaying ||
                selectedCell?.value === null ||
                selectedCell?.isGiven
              }
            >
              <BsEraser className="size-full" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
}
