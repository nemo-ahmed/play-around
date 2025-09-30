'use client'
import IconButton from '@/components/IconButton'
import {useSoduku, type SodukuNumbers} from '@/context/Soduku'
import {cx} from '@/other/exports'
import {DYNAMIC_NUMBERS} from '@/utils/Soduku'
import {BsArrowRepeat, BsEraser} from 'react-icons/bs'
import {IoArrowRedoOutline, IoArrowUndoOutline} from 'react-icons/io5'
import {VscDebugStart} from 'react-icons/vsc'

export const NumbersCell = ({
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
  const {
    onChange: onKeypadClick,
    selected: selectedCell,
    onRest,
    givenRef,
    newGame,
    onRedo,
    onUndo,
  } = useSoduku()

  const cellStyles: Record<typeof variant, string> = {
    keypad:
      'size-full fill-eerie-black-500 dark:fill-eerie-black-700 not-disabled:hover:fill-eerie-black-400 not-disabled:hover:dark:fill-eerie-black-600 border-collapse border border-eerie-black-300 dark:border-eerie-black-700',
    note: "size-full fill-transparent not-disabled:hover:fill-eerie-black-500 not-disabled:hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600",
  }
  return (
    <div>
      <div
        className={cx('grid grid-cols-3 grid-rows-3 content-center', {
          'size-[40dvh]': variant === 'keypad',
        })}
      >
        {([1, 2, 3, 4, 5, 6, 7, 8, 9] as SodukuNumbers[]).map(n => (
          <button
            key={'note-numbers-' + n}
            className={cx('p-2', cellStyles[variant])}
            data-selected={selected?.includes(n)}
            onClick={() => {
              if (variant === 'keypad' && selectedCell) {
                onKeypadClick({
                  boxIndex: selectedCell.boxIndex,
                  cellIndex: selectedCell.cellIndex,
                  value: n,
                })
              }
              onChange?.(n)
            }}
            disabled={
              !selectedCell ||
              givenRef[`${selectedCell.boxIndex}-${selectedCell.cellIndex}`]
            }
          >
            {DYNAMIC_NUMBERS[n]}
          </button>
        ))}
      </div>
      {variant === 'keypad' && (
        <div className="bg-eerie-black-600 border-2 border-collapse border-eerie-black-300 dark:border-eerie-black-700 rounded-b-2xl">
          <IconButton
            type="button"
            className="size-full h-8 w-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
            onClick={() => newGame(rating)}
            aria-label="new game"
          >
            <VscDebugStart className="size-full" />
          </IconButton>
          <div
            aria-label="divider"
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
              className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
              onClick={onUndo}
              aria-label="Undo"
            >
              <IoArrowUndoOutline className="size-full" />
            </IconButton>
            <div
              aria-label="divider"
              className="w-1 bg-eerie-black-300 dark:bg-eerie-black-700"
            />
            <IconButton
              type="button"
              aria-label="Redo"
              className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
              onClick={onRedo}
            >
              <IoArrowRedoOutline className="size-full" />
            </IconButton>
          </div>
          <div
            aria-label="divider"
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
              className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
              onClick={onRest}
              aria-label="reset game"
            >
              <BsArrowRepeat className="size-full" />
            </IconButton>
            <div
              aria-label="divider"
              className="w-1 bg-eerie-black-300 dark:bg-eerie-black-700"
            />
            <IconButton
              type="button"
              aria-label="erase cell"
              onClick={() => {
                if (variant === 'keypad' && selectedCell) {
                  onKeypadClick({
                    boxIndex: selectedCell.boxIndex,
                    cellIndex: selectedCell.cellIndex,
                    value: null,
                  })
                }
              }}
            >
              <BsEraser className="size-full" />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  )
}
