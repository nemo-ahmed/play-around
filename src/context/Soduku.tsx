'use client'

import {SodukuType} from '@/types/soduku'
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

interface SodukuContextType {
  state: SodukuGrid
  onChange: (params: {
    boxIndex: number
    cellIndex: number
    value: SodukuCell['value']
  }) => void
  onRest: () => void
}

const Soduku = createContext<Partial<SodukuContextType>>({})

const initSoduku = (soduku: string) => {
  // ? keep in mind if we find a soduku API we will need to check if its sent by box or by row
  return (soduku.match(/[0-9].{0,8}/gi) ?? []).map(row => {
    console.log(row)
    return row.split('').map(cell => ({
      value:
        !/[1-9]/.test(cell) && cell === '0'
          ? null
          : (Number(cell) as SodukuNumbers),
      isFalse: false,
      isGiven: /[1-9]/.test(cell),
      notes: [],
    }))
  }) as SodukuGrid
}

export default function SodukuProvider({
  children,
  data,
}: {
  children: ReactNode
  data: SodukuType
}) {
  const [state, setState] = useState<SodukuGrid>(() => initSoduku(data.data))

  function onChange({
    boxIndex,
    cellIndex,
    value,
  }: Parameters<SodukuContextType['onChange']>[0]) {
    console.log({boxIndex, cellIndex, value})
    const colIndex = getColIndex({boxIndex, cellIndex}) as SodukuNumbers
    const rowIndex = getRowIndex({boxIndex, cellIndex}) as SodukuNumbers

    const currentBox = state[boxIndex].map(({value: v}) => v)
    // ! I dont like this. lets make it faster
    const {currentRow, currentCol} = state.reduce(
      (
        acc: Record<'currentRow' | 'currentCol', Array<SodukuNumbers | null>>,
        box,
      ) => {
        console.log(box, rowIndex, colIndex, box[rowIndex], box[colIndex])
        return {
          currentRow: [...acc.currentRow, box[rowIndex].value],
          currentCol: [...acc.currentCol, box[colIndex].value],
        }
      },
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

  // ? We need to add a button for this
  const onRest = () => {
    setState(initSoduku(data.data))
  }

  const value: SodukuContextType = {state, onChange, onRest}
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
