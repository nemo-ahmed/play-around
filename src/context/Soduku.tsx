'use client'

import {SodukuTypeReturn} from '@/types/soduku'
import {getColIndex, getRowIndex, isSodukuNumber} from '@/utils/soduku'
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

export type SodukuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

type SodukuMatrix = Nullish<SodukuNumbers>[][]

type Selected = {
  value: Nullish<SodukuNumbers>
  rowIndex: number
  colIndex: number
  cellIndex: number
  boxIndex: number
}
interface SodukuContextType {
  state: Record<'rowState' | 'colState' | 'gridState', SodukuMatrix> & {
    count: number
  }
  onChange: (params: {
    boxIndex: number
    cellIndex: number
    value: Nullish<SodukuNumbers>
  }) => void
  onRest: () => void
  givenRef: Record<string, boolean>
  selected?: Selected
  onSelectChange: (props?: Selected) => void
}

const Soduku = createContext<Partial<SodukuContextType>>({})

const emptyMatrixJSON = JSON.stringify(Array(9).fill(Array(9).fill(null)))

export default function SodukuProvider({
  children,
  data,
}: {
  children: ReactNode
  data: SodukuTypeReturn
}) {
  const givensRef = useRef<Record<string, boolean>>({})
  const [state, setState] = useState<SodukuContextType['state']>({
    rowState: [],
    colState: [],
    gridState: [],
    count: 0,
  })
  const [selected, setSelections] = useState<SodukuContextType['selected']>()

  const initSoduku = useCallback(() => {
    const rowArr: SodukuMatrix = JSON.parse(emptyMatrixJSON)
    const colArr: SodukuMatrix = JSON.parse(emptyMatrixJSON)
    // ? After testing one of the sodukus
    // ? it Appears that we are not getting grids but maybe rows
    const dataArr = data.data[0].soduku.match(/[0-9].{0,8}/gi) ?? []
    let i = 0

    const rowsToGrid = dataArr.reduce(
      (acc, row) => {
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
              .map(x => (x === '0' ? null : (Number(x) as SodukuNumbers))),
          ].flat() as Nullish<SodukuNumbers>[]
        }

        return acc
      },
      [[], [], [], [], [], [], [], [], []] as Nullish<SodukuNumbers>[][],
    )

    // ? we are keeping this instead of refactoring logic and UI to use the fetched Soduku
    const gridArr: SodukuMatrix = rowsToGrid.map((grid, gridIndex) => {
      return grid.map((cell, cellIndex) => {
        const value = isSodukuNumber(cell) ? null : (cell as SodukuNumbers)
        console.log(value)
        if (value) {
          givensRef.current[`${gridIndex}-${cellIndex}`] = true
        }
        const colIndex = getColIndex({
          boxIndex: gridIndex,
          cellIndex,
        })
        const rowIndex = getRowIndex({
          boxIndex: gridIndex,
          cellIndex,
        })
        rowArr[rowIndex][colIndex] = value
        colArr[colIndex][rowIndex] = value
        return value
      })
    })

    setState({
      rowState: rowArr,
      colState: colArr,
      gridState: gridArr,
      count: data.data[0].soduku.match(/[1-9]/g)?.length ?? 0,
    })
    setSelections(undefined)
  }, [data.data])

  useEffect(() => {
    initSoduku()
  }, [initSoduku])

  function onChange({
    boxIndex,
    cellIndex,
    value,
  }: Parameters<SodukuContextType['onChange']>[0]) {
    console.log({boxIndex, cellIndex, value})
    const colIndex = getColIndex({boxIndex, cellIndex})
    const rowIndex = getRowIndex({boxIndex, cellIndex})

    setSelections({
      boxIndex,
      cellIndex,
      colIndex,
      rowIndex,
      value,
    })

    setState(prev => {
      prev.rowState[rowIndex][colIndex] = value
      prev.colState[colIndex][rowIndex] = value
      prev.gridState[boxIndex][cellIndex] = value
      prev.count = value !== null ? prev.count - 1 : prev.count + 1

      return {...prev}
    })
  }

  // ? We need to add a button for this
  const onRest = () => {
    initSoduku()
  }

  const value: SodukuContextType = {
    state,
    onChange,
    onRest,
    givenRef: givensRef.current,
    selected,
    onSelectChange: setSelections,
  }
  return <Soduku value={value}>{children}</Soduku>
}

export function useSoduku() {
  const soduku = useContext(Soduku)
  if (!soduku?.state || !soduku?.onChange || !soduku?.onRest) {
    throw new Error('useSoduku need to be used inside Soduku`s Provider')
  }
  const requiredSoduku = {...soduku} as SodukuContextType

  return requiredSoduku
}
