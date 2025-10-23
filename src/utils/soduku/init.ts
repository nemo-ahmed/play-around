import type {
  SodukuNumbers,
  SodukuPromiseReturn,
  SodukuPuzzle,
  SodukuState,
} from '@/types/soduku'

import {getColIndex, getRowIndex, isSodukuNumber} from './Utils'

const emptyPuzzle = JSON.stringify(Array(9).fill(Array(9).fill(null)))

export const getGivenKey = ({
  gridIndex,
  cellIndex,
}: {
  gridIndex: number
  cellIndex: number
}) => `${gridIndex}-${cellIndex}`

export function initSoduku(data: SodukuPromiseReturn): Partial<SodukuState> {
  const given: Record<string, boolean> = {}
  const rowArr = JSON.parse(emptyPuzzle) as SodukuPuzzle
  const colArr = JSON.parse(emptyPuzzle) as SodukuPuzzle
  let rowsToGrid = JSON.parse(emptyPuzzle) as SodukuPuzzle

  const dataArr = data?.puzzleBoard?.match(/[0-9].{0,8}/gi) ?? []
  let i = 0

  rowsToGrid = dataArr.reduce(
    (acc: Nullish<SodukuNumbers>[][], row) => {
      if (
        (i === 0 && acc[0].length === 9) ||
        (i === 3 && acc[3].length === 9)
      ) {
        i += 3
      }
      const array = row.match(/[0-9].{0,2}/gi) as ['', '', '']
      // ? Assigning each row its place in grid
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        acc[i + index] = [
          ...acc[i + index],
          element
            .split('')
            .map(x =>
              !isSodukuNumber(x) ? null : (Number(x) as SodukuNumbers),
            ),
        ].flat() as Nullish<SodukuNumbers>[]
      }

      return acc
    },
    [[], [], [], [], [], [], [], [], []],
  )

  // ? we are keeping this instead of refactoring logic and UI to use the fetched Soduku
  const gridArr: SodukuPuzzle = rowsToGrid.map((grid, gridIndex) => {
    return grid.map((value, cellIndex) => {
      if (value) {
        given[getGivenKey({gridIndex, cellIndex})] = true
      }
      const colIndex = getColIndex({
        gridIndex,
        cellIndex,
      })
      const rowIndex = getRowIndex({
        gridIndex,
        cellIndex,
      })
      rowArr[rowIndex][colIndex] = value
      colArr[colIndex][rowIndex] = value
      return value
    })
  })
  return {
    rowState: rowArr,
    colState: colArr,
    gridState: gridArr,
    count: data?.puzzleBoard?.match(/[1-9]/g)?.length ?? 0,
    given,
  }
}
