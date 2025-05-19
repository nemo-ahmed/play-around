export function getPath(matrix: number[][]) {
  const obj: Record<number, number[]> = {}
  matrix.map((elements, x) => {
    return elements.reduce((acc: number[], n, i) => {
      if (
        n === 0 &&
        ((x < matrix.length && x > 0) ||
          (matrix[x + 1] && matrix[x + 1][i] === 0) ||
          (matrix[x][i + 1] && matrix[x][i + 1] === 0) ||
          (matrix[x][i - 1] && matrix[x][i - 1] === 0)) &&
        (x === 0 ||
          obj[x - 1].includes(i) ||
          (i < elements.length && obj[x - 1].includes(i + 1)) ||
          (i > 0 && obj[x - 1].includes(i - 1)) ||
          obj[x].includes(i - 1))
      ) {
        acc.push(i)
        matrix[x][i] = 9
      }
      obj[x] = acc
      return acc
    }, [])
  })

  return matrix
}
