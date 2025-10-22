'use client'
import Active from '@/components/ClientActivity'
import IconButton from '@/components/IconButton'
import {useSoduku} from '@/context/soduku/Soduku'
import {cx} from '@/other/exports'
import type {SodukuNumbers} from '@/types/soduku'
import {DYNAMIC_NUMBERS} from '@/utils/soduku'
import {useState} from 'react'
import {BsArrowRepeat, BsEraser} from 'react-icons/bs'
import {CgSpinnerTwo} from 'react-icons/cg'
import {CiWarning} from 'react-icons/ci'
import {
  IoArrowRedoOutline,
  IoArrowUndoOutline,
  IoArrowUpOutline,
  IoRemoveOutline,
} from 'react-icons/io5'
import {LiaLightbulb} from 'react-icons/lia'
import {VscDebugStart} from 'react-icons/vsc'
import Timer from './Timer'
import {motion} from 'motion/react'

export function Controls({
  variant,
  onChange,
  selected,
  isOnline = true,
}: {
  variant: 'note' | 'keypad'
  onChange?: (n: SodukuNumbers) => void
  selected?: SodukuNumbers[]
  isOnline?: boolean
}) {
  const [
    {
      selected: selectedCell,
      given,
      history,
      isPlaying,
      autoHints,
      onStart,
      isPending,
      isLoading,
    },
    dispatch,
  ] = useSoduku()
  const [shouldDisplayKeypad, setShouldDisplayKeypad] = useState(false)
  const [{rawData}] = useSoduku()
  const cellStyles: Record<typeof variant, string> = {
    keypad:
      'p-2 size-full fill-eerie-black-500 dark:fill-eerie-black-700 not-disabled:hover:fill-eerie-black-400 not-disabled:hover:dark:fill-eerie-black-600 border border-eerie-black-300 dark:border-eerie-black-700',
    note: "size-full fill-transparent not-disabled:hover:fill-eerie-black-500 not-disabled:hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600",
  }

  const loading = isLoading || isPending || false

  return (
    <section
      aria-label="soduku controls"
      className={cx({
        'w-[min(30dvh,40dvw)]': variant === 'keypad',
      })}
    >
      <Active isVisible={variant === 'keypad'}>
        <div
          className={cx(
            'p-1 bg-eerie-black-900 dark:bg-eerie-black-800 relative ',
            'rounded-t border border-eerie-black-300 dark:border-eerie-black-700',
          )}
        >
          <Active isVisible={!isOnline}>
            <div className="absolute -top-7 right-0 -me-7 w-full h-5 flex items-center gap-1 capitalize">
              <CiWarning className="text-amber-500" size={22} />
              keyboard listener is not working
            </div>
          </Active>
          <div className="flex flex-wrap justify-between px-2 pt-2 pb-1.5 capitalize">
            <h3 className="text-rich-black-100 font-extralight flex gap-1">
              difficulty:
              <Active
                isVisible={!!rawData?.difficulty && !isLoading}
                fallback={
                  <div className="h-6 w-16 bg-eerie-black-600 dark:bg-eerie-black-500 animate-pulse rounded-xs" />
                }
              >
                {rawData?.difficulty}
              </Active>
            </h3>
            <Timer />
          </div>
        </div>
      </Active>
      <div
        className={cx({
          'size-full': variant === 'note',
        })}
      >
        <motion.div
          className={cx({
            'w-full max-h-fit border border-y-0 border-eerie-black-300 dark:border-eerie-black-700 overflow-hidden':
              variant === 'keypad',
            'size-full': variant === 'note',
          })}
          animate={{
            height:
              variant === 'keypad'
                ? shouldDisplayKeypad
                  ? 'calc(min(30dvh,40dvw) + 30px)'
                  : 31
                : undefined,
          }}
          transition={{duration: 0.5}}
        >
          <Active isVisible={variant === 'keypad'}>
            <IconButton
              type="button"
              onClick={() => setShouldDisplayKeypad(prev => !prev)}
              aria-label={shouldDisplayKeypad ? 'Hide keypad' : 'Show keypad'}
              label={shouldDisplayKeypad ? 'Hide keypad' : 'Show keypad'}
              className="h-8 bg-outer-space-800 dark:bg-eerie-black-600"
            >
              <div className="-space-y-2 h-fit size-full">
                <IoRemoveOutline
                  className={cx('transition-opacity duration-300 delay-300', {
                    'opacity-0': !shouldDisplayKeypad,
                    'opacity-100': shouldDisplayKeypad,
                  })}
                />
                <IoArrowUpOutline
                  className={cx('transition-transform duration-300', {
                    'rotate-180': !shouldDisplayKeypad,
                    'rotate-0': shouldDisplayKeypad,
                  })}
                />
                <IoRemoveOutline
                  className={cx('transition-opacity duration-300 delay-300', {
                    'opacity-0': shouldDisplayKeypad,
                    'opacity-100': !shouldDisplayKeypad,
                  })}
                />
              </div>
            </IconButton>
          </Active>
          <Active isVisible={variant === 'keypad'}>
            <div className={cx('grid grid-cols-3 grid-rows-3')}>
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as SodukuNumbers[]).map(n => (
                <button
                  key={'note-numbers-' + n}
                  className={cx(cellStyles[variant], {
                    // 'rounded-tr': n === 3,
                    // 'rounded-tl': n === 1,
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
            </div>{' '}
          </Active>
        </motion.div>
        <Active isVisible={variant === 'keypad'}>
          <div className="flex flex-col bg-outer-space-800 dark:bg-eerie-black-600 border border-eerie-black-300 dark:border-eerie-black-700 rounded-b">
            <IconButton
              type="button"
              onClick={onStart}
              aria-label={loading ? 'Submitting Game' : 'Start a new game'}
              label={loading ? 'Submitting Game' : 'new game'}
              disabled={loading}
              className="h-8"
            >
              {loading ? (
                <CgSpinnerTwo
                  aria-hidden
                  size={24}
                  className="animate-spin text-blue-400"
                />
              ) : (
                <VscDebugStart aria-hidden className="mx-auto" size={24} />
              )}
            </IconButton>
            <div
              aria-label="divider"
              aria-hidden
              className="h-[1px] bg-eerie-black-300 dark:bg-eerie-black-700"
            />
            <IconButton
              type="button"
              onClick={() => {
                dispatch({type: 'toggle-auto-hints'})
              }}
              aria-hidden
              className="h-8"
              isActive={autoHints}
              label={`${autoHints ? 'Disable' : 'Enable'} auto notes`}
              disabled={!isPlaying}
            >
              <LiaLightbulb aria-hidden className="mx-auto" size={24} />
            </IconButton>

            <div
              aria-label="divider"
              aria-hidden
              className="h-[1px] bg-eerie-black-300 dark:bg-eerie-black-700"
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
                <IoArrowUndoOutline aria-hidden className="mx-auto" size={24} />
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
                <IoArrowRedoOutline aria-hidden className="mx-auto" size={24} />
              </IconButton>
            </div>
            <div
              aria-label="divider"
              aria-hidden
              className="h-[1px] bg-eerie-black-300 dark:bg-eerie-black-700"
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
                <BsArrowRepeat aria-hidden className="mx-auto" size={24} />
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
                      payload: 'delete',
                    })
                  }
                }}
                disabled={
                  !isPlaying ||
                  !selectedCell ||
                  selectedCell?.value === null ||
                  selectedCell?.isGiven ||
                  false
                }
              >
                <BsEraser size={24} aria-hidden />
              </IconButton>
            </div>
          </div>
        </Active>
      </div>
    </section>
  )
}
