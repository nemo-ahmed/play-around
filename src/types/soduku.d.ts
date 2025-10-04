export type SodukuNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type SodukuGetParams = {
  offset?: string
  limit?: string
  ratting?: string
}

export interface SodukuPromiseData {
  id: string
  soduku: string
  rating: string
}

export interface SodukuPromiseReturn {
  total: number
  data: SodukuPromiseData[]
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
}
