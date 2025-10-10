export function solveSudoku(board: number[][]) {
  const emptyCell = findEmptyCell(board)
  if (!emptyCell) {
    return true // Puzzle solved
  }

  const [row, col] = emptyCell

  const numbers = Array.from({length: 9}, (_, i) => i + 1).sort(
    () => Math.random() - 0.5,
  )
  for (const num of numbers) {
    if (isValid(board, num, [row, col])) {
      board[row][col] = num
      if (solveSudoku(board)) {
        return true
      }
      board[row][col] = 0 // Backtrack
    }
  }
  return false
}

function findEmptyCell(board: number[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j]
      }
    }
  }
  return null
}

function isValid(board: number[][], num: number, pos: [number, number]) {
  const [row, col] = pos

  // Check row
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num && col !== j) {
      return false
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && row !== i) {
      return false
    }
  }

  // Check 3x3 box
  const boxX = Math.floor(col / 3)
  const boxY = Math.floor(row / 3)
  for (let i = boxY * 3; i < boxY * 3 + 3; i++) {
    for (let j = boxX * 3; j < boxX * 3 + 3; j++) {
      if (board[i][j] === num && (i !== row || j !== col)) {
        return false
      }
    }
  }

  return true
}

export function generateSudoku(difficulty = 'medium') {
  const solvedBoard = Array.from({length: 9}, () =>
    Array(9).fill(0),
  ) as number[][]
  solveSudoku(solvedBoard)

  let cellsToRemove
  if (difficulty === 'easy') {
    cellsToRemove = Math.floor(Math.random() * (36 - 30 + 1)) + 30
  } else if (difficulty === 'medium') {
    cellsToRemove = Math.floor(Math.random() * (45 - 37 + 1)) + 37
  } else if (difficulty === 'hard') {
    cellsToRemove = Math.floor(Math.random() * (52 - 46 + 1)) + 46
  } else if (difficulty === 'expert') {
    cellsToRemove = Math.floor(Math.random() * (58 - 53 + 1)) + 53
  } else if (difficulty === 'evil') {
    return generateUniqueSudoku()
  } else {
    throw new Error('Invalid difficulty level.')
  }

  const puzzleBoard = solvedBoard.map(row => row.slice()) as number[][]

  for (let i = 0; i < cellsToRemove; i++) {
    let row, col
    do {
      row = Math.floor(Math.random() * 9)
      col = Math.floor(Math.random() * 9)
    } while (puzzleBoard[row][col] === 0)
  }

  return {
    puzzleBoard: puzzleBoard.flat().join(''),
    solvedBoard: solvedBoard.flat().join(''),
  }
}

// Define the grid type. 0 represents an empty cell.
type Grid = number[][]
const GRID_SIZE = 9

// --- STEP 1: Generate a fully solved grid ---

// A backtracking solver to fill the grid.
function fillGrid(grid: Grid): boolean {
  const emptyCell = findEmptyCell(grid)
  if (!emptyCell) {
    return true // The grid is full, a solution is found.
  }

  const [row, col] = emptyCell
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  shuffle(numbers) // Randomize numbers for different puzzles.

  for (const num of numbers) {
    if (isUniquelyValid(grid, row, col, num)) {
      grid[row][col] = num
      if (fillGrid(grid)) {
        return true
      }
      grid[row][col] = 0 // Backtrack
    }
  }
  return false
}

// Check if placing a number is valid according to Sudoku rules.
function isUniquelyValid(
  grid: Grid,
  row: number,
  col: number,
  num: number,
): boolean {
  // Check row
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === num) return false
  }
  // Check column
  for (let y = 0; y < GRID_SIZE; y++) {
    if (grid[y][col] === num) return false
  }
  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c] === num) return false
    }
  }
  return true
}

// Fisher-Yates shuffle algorithm.
function shuffle(array: (number | [number, number])[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// --- STEP 2 & 3: Remove numbers and check for uniqueness ---

// Counts the number of solutions for a given grid.
function countSolutions(grid: Grid, count: {value: number}): void {
  const emptyCell = findEmptyCell(grid)
  if (!emptyCell) {
    count.value++
    return
  }

  const [row, col] = emptyCell
  for (let num = 1; num <= 9; num++) {
    if (isUniquelyValid(grid, row, col, num)) {
      grid[row][col] = num
      countSolutions(grid, count)
      if (count.value > 1) {
        // Optimization: Stop if multiple solutions found
        return
      }
      grid[row][col] = 0 // Backtrack
    }
  }
}

// Main function to generate the unique Sudoku puzzle.
export function generateUniqueSudoku() {
  // Initialize an empty grid
  const solution: Grid = Array.from({length: 9}, () => Array(9).fill(0))

  // Step 1: Fill the grid completely.
  fillGrid(solution)

  // Create a copy for the puzzle
  const puzzle: Grid = JSON.parse(JSON.stringify(solution))

  // Get a list of all cell coordinates and shuffle it
  const allCells: [number, number][] = []
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      allCells.push([row, col])
    }
  }
  shuffle(allCells)

  // Step 2: Remove numbers while ensuring uniqueness.
  for (const [row, col] of allCells) {
    const temp = puzzle[row][col]
    puzzle[row][col] = 0

    // Step 3: Check for uniqueness.
    const solutionCount = {value: 0}
    countSolutions(JSON.parse(JSON.stringify(puzzle)), solutionCount)

    if (solutionCount.value !== 1) {
      puzzle[row][col] = temp // Restore the number if uniqueness is lost
    }
  }

  return {
    puzzleBoard: puzzle.flat().join(''),
    solutionBoard: solution.flat().join(''),
  }
}
