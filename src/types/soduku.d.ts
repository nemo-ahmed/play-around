import {UseMutateFunction} from '@tanstack/react-query'

export type SodukuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type SodukuDifficulties = 'easy' | 'medium' | 'hard' | 'expert' | 'evil'

export type SodukuGetParams = {
  offset?: string
  limit?: string
  ratting?: string
}

export interface SodukuPromiseData {
  puzzleBoard: string
  solvedBoard: string
  difficulty: string
  id: string
}

export interface SodukuPromiseReturn {
  puzzleBoard: string
  solvedBoard: string
  difficulty: string
  id: string
}

export type SodukuPuzzle = Nullish<SodukuNumbers>[][]

export interface SodukuSelectedCell {
  value: Nullish<SodukuNumbers>
  rowIndex: number
  colIndex: number
  cellIndex: number
  gridIndex: number
}

export type SodukuHistory = Record<'undo' | 'redo', State[]>

export interface SodukuState {
  history: Record<'undo' | 'redo', State[]>
  given: Record<string, boolean>
  selected?: {
    value: Nullish<SodukuNumbers>
    rowIndex: number
    colIndex: number
    cellIndex: number
    gridIndex: number
    isGiven: boolean
  }
  rawData: SodukuPromiseReturn
  count: number
  rowState: SodukuPuzzle
  colState: SodukuPuzzle
  gridState: SodukuPuzzle
  autoHints: boolean
  isPlaying: boolean
  submitSoduku: UseMutateFunction<Response, Error, SodukuPromiseData, unknown>
}
