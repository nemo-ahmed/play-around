'use client'
import {useSoduku, type SodukuNumbers} from '@/context/Soduku'
import {DYNAMIC_NUMBERS} from '@/utils/soduku'

export const NumbersCell = ({
  variant,
  onChange,
  selected,
}: {
  variant: 'note' | 'keypad'
  onChange?: (n: SodukuNumbers) => void
  selected?: SodukuNumbers[]
}) => {
  const {onChange: onKeypadClick, selected: selectedCell} = useSoduku()
  const cellStyles: Record<typeof variant, string> = {
    keypad:
      'size-full fill-eerie-black-500 dark:fill-eerie-black-700 hover:fill-eerie-black-400 hover:dark:fill-eerie-black-600 border-collapse border border-eerie-black-300 dark:border-eerie-black-700',
    note: "size-full fill-transparent hover:fill-eerie-black-500 hover:dark:fill-eerie-black-700 data-[selected='true']:fill-eerie-black-400 data-[selected='true']:dark:fill-eerie-black-600",
  }
  return (
    <div className="grid grid-cols-3 grid-rows-3 content-center">
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
        >
          {DYNAMIC_NUMBERS[n]}
        </button>
      ))}
    </div>
  )
}
