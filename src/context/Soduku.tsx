'use client'

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
  setState: React.Dispatch<React.SetStateAction<SodukuGrid>>
}

const Soduku = createContext<Partial<SodukuType>>({})

export default function SodukuProvider({children}: {children: ReactNode}) {
  const [state, setState] = useState<SodukuGrid>([])

  function onChange({
    row,
    col,
    value,
  }: {
    row: number
    col: number
    value: SodukuNumbers
  }) {
    // ? take and cross check the 3 related groups
  }

  const value: SodukuType = {state, setState}
  return <Soduku value={value}>{children}</Soduku>
}

export function useSoduku() {
  const soduku = useContext(Soduku)
  if (!soduku?.state || !soduku?.setState) {
    throw new Error('useSoduku need to be used inside Soduku`s Provider')
  }
  const requiredSoduku = soduku as SodukuType

  return requiredSoduku
}
