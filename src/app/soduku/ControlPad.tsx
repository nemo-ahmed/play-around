'use client'
import {useSoduku, type SodukuNumbers} from '@/context/Soduku'
import {cx} from '@/other/exports'
import {DYNAMIC_NUMBERS} from '@/utils/soduku'
import {BsArrowRepeat, BsEraser, BsFeather, BsFeather2} from 'react-icons/bs'

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
            className={cellStyles[variant]}
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
        <div
          className={cx(
            'flex h-8 bg-eerie-black-600 border-2 border-collapse border-eerie-black-300 dark:border-eerie-black-700 rounded-b-2xl',
            // ? For some reason without this the edges is not aligned
            'm-[-1]',
          )}
        >
          <button
            type="button"
            className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
            onClick={() => newGame(rating)}
            aria-label="new game"
          >
            <BsFeather className="size-9/12" />
          </button>
          <div
            aria-label="divider"
            className="w-1 bg-eerie-black-300 dark:bg-eerie-black-700"
          />
          <button
            type="button"
            className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
            onClick={onRest}
            aria-label="reset game"
          >
            <BsArrowRepeat className="size-9/12" />
          </button>
          <div
            aria-label="divider"
            className="w-1 bg-eerie-black-300 dark:bg-eerie-black-700"
          />
          <button
            type="button"
            aria-label="erase cell"
            className="size-full flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18"
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
            <BsEraser className="size-9/12" />
          </button>
        </div>
      )}
    </div>
  )
}
