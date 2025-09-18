import fs from 'fs'

export function convertTxtToJson(txtData: string) {
  const arr = txtData
    .split('\n')
    .map(line => (line.startsWith('//') ? '' : line.split(/\s+/)))
    .sort(([, , a], [, , b]) => Number(a) - Number(b))

  return arr.reduce((acc, line) => {
    const lineArr = line
    if (lineArr.length <= 1) return acc
    return {
      ...acc,
      [lineArr[0]]: {
        id: lineArr[0],
        data: lineArr[1],
        rating: lineArr[2],
      },
    }
  }, {})
}

export async function readFile(filePathFromAppDown: string) {
  return await fs.promises
    .readFile(process.cwd() + filePathFromAppDown, 'utf8')
    .then(data => {
      return data.toString()
    })
    .catch(() => 'error')
}

// ? To Update a file you need first to read it
// ? Merge its content with the new data then pass it as a string
export async function writeDataToFile({
  name,
  data,
}: {
  name: string
  data: string
}) {
  return await fs.promises.writeFile(
    process.cwd() + `/src/data/${name}.json`,
    data,
    'utf8',
  )
}
