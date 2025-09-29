'use client'

import {SodukuTypeReturn} from '@/types/soduku'
import {fetchSoduku} from '@/utils/fetchSoduku'
import {getColIndex, getRowIndex, isSodukuNumber} from '@/utils/Soduku'
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

type State = Record<'rowState' | 'colState' | 'gridState', SodukuMatrix> & {
  count: number
}
interface SodukuContextType {
  state: State
  history: Record<'undo' | 'redo', State[]>
  onChange: (params: {
    boxIndex: number
    cellIndex: number
    value: Nullish<SodukuNumbers>
  }) => void
  onRest: () => void
  givenRef: Record<string, boolean>
  selected?: Selected
  onSelectChange: (props?: Selected) => void
  submitResult: (rating?: string) => void
  newGame: (rating?: string) => void
  rawData: SodukuTypeReturn
  onUndo: VoidFunction
  onRedo: VoidFunction
}

const Soduku = createContext<Partial<SodukuContextType>>({})

const emptyMatrixJSON = JSON.stringify(Array(9).fill(Array(9).fill(null)))

export default function SodukuProvider({
  children,
  data: incomingData,
}: {
  children: ReactNode
  data: SodukuContextType['rawData']
}) {
  const [data, setData] = useState(incomingData)
  const [history, setHistory] = useState<SodukuContextType['history']>({
    undo: [],
    redo: [],
  })
  const givensRef = useRef<Record<string, boolean>>({})
  const [state, setState] = useState<SodukuContextType['state']>({
    // ? Dealing with server error
    rowState: JSON.parse(emptyMatrixJSON),
    colState: JSON.parse(emptyMatrixJSON),
    gridState: JSON.parse(emptyMatrixJSON),
    count: 0,
  })
  const [selected, setSelections] = useState<SodukuContextType['selected']>()

  const initSoduku = useCallback(() => {
    givensRef.current = {}
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

    const newState = {
      rowState: rowArr,
      colState: colArr,
      gridState: gridArr,
      count: data.data[0].soduku.match(/[1-9]/g)?.length ?? 0,
    }
    // ? Cleaning States
    setState(newState)
    setSelections(undefined)
    setHistory({redo: [], undo: []})
  }, [data.data])

  useEffect(() => {
    initSoduku()
  }, [initSoduku])

  function onChange({
    boxIndex,
    cellIndex,
    value,
  }: Parameters<SodukuContextType['onChange']>[0]) {
    const colIndex = getColIndex({boxIndex, cellIndex})
    const rowIndex = getRowIndex({boxIndex, cellIndex})

    setSelections({
      boxIndex,
      cellIndex,
      colIndex,
      rowIndex,
      value,
    })
    setHistory(prev => ({
      redo: [],
      undo: [...prev.undo, structuredClone(state)],
    }))
    setState(prev => {
      prev.rowState[rowIndex][colIndex] = value
      prev.colState[colIndex][rowIndex] = value
      prev.gridState[boxIndex][cellIndex] = value
      // ? Its never going to be Null but ...
      prev.count = prev.rowState.flat().join('').match(/[1-9]/g)?.length ?? -1

      return {...prev}
    })
  }

  const onRest = () => {
    initSoduku()
  }

  const onUndo = () => {
    if (history.undo.length === 0) return
    const newHistory = structuredClone(history)
    const newState = newHistory.undo.pop() as Required<typeof state>
    newHistory.redo.push(structuredClone(state))
    setState(newState)
    setHistory(newHistory)
  }

  const onRedo = () => {
    if (history.redo.length === 0) return

    const newHistory = structuredClone(history)
    const newState = newHistory.redo.pop() as Required<typeof state>
    newHistory.undo.push(structuredClone(state))
    setState(newState)
    setHistory(newHistory)
  }

  const newGame: SodukuContextType['newGame'] = useCallback(
    async rating => {
      const newSoduku = await fetchSoduku(rating)

      setData(newSoduku)
      initSoduku()
    },
    [initSoduku],
  )

  const submitResult: SodukuContextType['submitResult'] = useCallback(
    async rating => {
      const solution = state.rowState.flat().join('')

      const res = await fetch('http://localhost:3000/api/soduku/submit', {
        body: JSON.stringify({
          id: data.data[0].id,
          soduku: solution,
          rating: data.data[0].rating,
        }),
        method: 'POST',
      })
        .then(async res => (await res.text()) as 'success')
        .catch(err => err)

      if (res === 'success') {
        newGame(rating)
      }
    },
    [data.data, newGame, state.rowState],
  )

  const value: SodukuContextType = {
    state,
    onChange,
    onRest,
    givenRef: givensRef.current,
    selected,
    onSelectChange: setSelections,
    submitResult,
    newGame,
    rawData: data,
    history,
    onRedo,
    onUndo,
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
