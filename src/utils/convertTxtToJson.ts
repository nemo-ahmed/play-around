import type {SodukuType} from '@/types/soduku'
import fs from 'fs'
import Readline from 'node:readline'

// ! look into this
// import {createGzip} from 'node:zlib'

export function convertTxtDataToJsonData(fileName: string) {
  if (!fileName.includes('.txt')) {
    throw new Error('invalid file type')
  }
  const rs = fs.createReadStream(
    process.cwd() + `/src/data/${fileName}`,
    'utf8',
  )
  // ? This is awesome for correctly reading lines
  const rl = Readline.createInterface({input: rs})
  ;(async () => {
    const obj: Record<string, SodukuType[]> = {}
    for await (const line of rl) {
      // ? Ignoring comment lines
      if (line.startsWith('//')) {
        continue
      } else {
        const [id, soduku, rating] = (line as string).split(/\s+/) as [
          '',
          '',
          '',
        ]
        const key = Math.floor(Number(rating)).toString()
        if (key !== 'NaN') {
          obj[key] = [...(obj[key] ?? []), {id, soduku, rating}]
        }
      }
    }

    for await (const name of Object.keys(obj)) {
      const writeStream = fs.createWriteStream(
        process.cwd() + `/src/data/soduku/${name}.json`,
      )

      writeStream.write(
        JSON.stringify({
          total: obj[name].length,
          data: obj[name],
        }),
      )
      writeStream.end()
    }
  })()

  // ? ideally we want this form
  // ? 1- create a file for each rank segment ie: 5.0 - 5.9
  //  to make things faster
  // this will hopefully lower the numbers of sodukus
  // which will allow us to make an array for the solvable sodukus index and get a random one from them
  // ? 2- {total: arr.length; data:{id:string; soduku: string; rank: number}[]}
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
