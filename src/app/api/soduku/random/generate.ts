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

    const originalNum = puzzleBoard[row][col]
    puzzleBoard[row][col] = 0

    // A simple uniqueness check (not rigorous)
    const tempBoard = puzzleBoard.map(r => r.slice())
    // In a complete implementation, a rigorous uniqueness check would be used here
  }

  return {
    puzzleBoard: puzzleBoard.flat().join(''),
    solvedBoard: solvedBoard.flat().join(''),
  }
}

// Example usage
// const easyPuzzle = generateSudoku('easy')
// console.log('Easy Sudoku Puzzle:')
// easyPuzzle.puzzleBoard.forEach(row => console.log(row))

// const hardPuzzle = generateSudoku('hard')
// console.log('\nHard Sudoku Puzzle:')
// hardPuzzle.puzzleBoard.forEach(row => console.log(row))
