'use client'

import {getColIndex, getRowIndex} from '@/utils/soduku'
import {createContext, type ReactNode, useContext, useState} from 'react'

export type SodukuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface SodukuCell {
  value: SodukuNumbers | null
  isGiven: boolean
  isFalse: boolean
  notes: SodukuNumbers[]
}

export type SodukuGrid = SodukuCell[][]

interface SodukuType {
  state: SodukuGrid
  onChange: (params: {
    boxIndex: number
    cellIndex: number
    value: SodukuNumbers
  }) => void
  onStart: (soduku: SodukuNumbers[][]) => void
}

const Soduku = createContext<Partial<SodukuType>>({})

export default function SodukuProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<SodukuGrid>([])

  function onChange({
    boxIndex,
    cellIndex,
    value,
  }: {
    boxIndex: number
    cellIndex: number
    value: SodukuNumbers
  }) {
    const colIndex = getColIndex({boxIndex, cellIndex}) as SodukuNumbers
    const rowIndex = getRowIndex({boxIndex, cellIndex}) as SodukuNumbers

    const currentBox = state[boxIndex].map(({value: v}) => v)
    const {currentRow, currentCol} = state.reduce(
      (
        acc: Record<'currentRow' | 'currentCol', Array<SodukuNumbers | null>>,
        box,
      ) => ({
        currentRow: [...acc.currentRow, box[rowIndex].value],
        currentCol: [...acc.currentCol, box[colIndex].value],
      }),
      {currentRow: [], currentCol: []},
    )

    const isFound =
      currentRow.includes(value) ||
      currentCol.includes(value) ||
      currentBox.includes(value)

    setState(prev => {
      const newState = [...prev]
      newState[boxIndex][cellIndex].isFalse = isFound
      newState[boxIndex][cellIndex].value = value
      return newState
    })
  }

  const onStart = (soduku: SodukuNumbers[][]) => {
    // ? keep in mind if we find a soduku API we will need to check if its sent by box or by row
    const newSoduku: SodukuGrid = soduku.map(row =>
      row.map(cell => ({
        value: cell,
        isFalse: false,
        isGiven: cell !== null,
        notes: [],
      })),
    )
    setState(newSoduku)
  }

  const value: SodukuType = {state, onChange, onStart}
  return <Soduku value={value}>{children}</Soduku>
}

export function useSoduku() {
  const soduku = useContext(Soduku)
  if (!soduku?.state || !soduku?.onChange || !soduku?.onStart) {
    throw new Error('useSoduku need to be used inside Soduku`s Provider')
  }
  const requiredSoduku = soduku as SodukuType

  return requiredSoduku
}
