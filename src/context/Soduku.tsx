'use client'

import {SodukuType} from '@/types/soduku'
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

export interface SodukuCell {
  value: SodukuNumbers | null
  isGiven: boolean
  isFalse: boolean
  notes: SodukuNumbers[]
}

export type SodukuGrid = SodukuCell[][]
type SodukuMatrix = Nullish<SodukuNumbers>[][]

interface SodukuContextType {
  state: {
    rowState: SodukuMatrix
    colState: SodukuMatrix
    gridState: SodukuMatrix
  }
  onChange: (params: {
    boxIndex: number
    cellIndex: number
    value: SodukuCell['value']
  }) => void
  onRest: () => void
  givenRef: Record<string, boolean>
}

const Soduku = createContext<Partial<SodukuContextType>>({})

const emptyMatrixJSON = JSON.stringify(Array(9).fill(Array(9).fill(null)))

export default function SodukuProvider({
  children,
  data,
}: {
  children: ReactNode
  data: SodukuType
}) {
  const givensRef = useRef<Record<string, boolean>>({})
  const [state, setState] = useState<SodukuContextType['state']>({
    rowState: [],
    colState: [],
    gridState: [],
  })
  const initSoduku = useCallback(() => {
    const rowArr: SodukuMatrix = JSON.parse(emptyMatrixJSON)
    const colArr: SodukuMatrix = JSON.parse(emptyMatrixJSON)
    const dataArr = data.data.match(/[0-9].{0,8}/gi) ?? []

    const gridArr: SodukuMatrix = dataArr.map((grid, gridIndex) => {
      return grid.split('').map((cell, cellIndex) => {
        const value = isSodukuNumber(cell)
          ? null
          : (Number(cell) as SodukuNumbers)
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

    setState({rowState: rowArr, colState: colArr, gridState: gridArr})
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

    setState(prev => {
      prev.rowState[rowIndex][colIndex] = value
      prev.colState[colIndex][rowIndex] = value
      prev.gridState[boxIndex][cellIndex] = value
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
