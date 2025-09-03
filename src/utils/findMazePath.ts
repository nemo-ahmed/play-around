export const REPLACING_NUMBER = 9

export const gridValidation = (
  matrix: number[][],
  fn?: (row: number[], i: number) => void,
) =>
  matrix.reduce((validation: boolean[], row, i) => {
    fn?.(row, i)

    const isRowValid = row.includes(0) && row.includes(1)
    if (!isRowValid) return validation
    return [...validation, isRowValid]
  }, []).length === matrix.length

export function getPath(matrix: number[][]) {
  // ? to Prevent overriding the original
  const solution = JSON.parse(JSON.stringify(matrix))
  const obj: Record<number, number[]> = {}
  const isValid = gridValidation(matrix, (row, i) => {
    obj[i] = row.reduce((acc: number[], n, j) => {
      if (n === 0) {
        acc.push(j)
        return acc
      }
      return acc
    }, [])
  })

  if (!isValid) return matrix

  let curr = -1
  for (const i in obj) {
    const row = obj[i]
    const nextRow = obj[Number(i) + 1]
    if (row.length === 1) {
      curr = row[0]
      solution[i][row[0]] = REPLACING_NUMBER
      continue
    } else if (Number(i) === matrix.length - 1 && row.includes(curr)) {
      obj[i] = [curr]
      solution[i][curr] = REPLACING_NUMBER
      break
    }

    const res = row.filter(
      (x, _, arr) =>
        // ? Straight
        nextRow?.includes(x) ||
        // ? Check if its surrounded with 3 walls
        ((!row.includes(x - 1) || !row.includes(x + 1)) &&
        !nextRow.includes(x) &&
        obj[Number(i) - 1] &&
        !obj[Number(i) - 1]?.includes(x)
          ? false
          : (curr !== -1 && curr === x) ||
            ((arr.includes(x - 1) || arr.includes(x + 1)) && // ? Checking Side ways
              (row.includes(x + 1) || row.includes(x - 1)))),
    )
    obj[i] = res
    res.forEach(n => {
      solution[i][n] = REPLACING_NUMBER
    })
    curr = [...res].pop() ?? -1
  }

  return solution
}
