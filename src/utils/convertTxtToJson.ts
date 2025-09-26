import type {SodukuType} from '@/types/soduku'
import fs from 'fs'
import {uniqWith, isEqual} from '@/other/exports'
import {createReadStream} from 'node:fs'
import Readline from 'node:readline'

// ! look into this
// import {createGzip} from 'node:zlib'

export function convertTxtToJsonFiles(fileName: string) {
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
    console.log('handling lines')
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

    console.log('Started Writing/checking', Object.keys(obj).length)

    for await (const name of Object.keys(obj)) {
      const readStream = fs.existsSync(
        process.cwd() + `/src/data/soduku/${name}.json`,
      )

      let arr = obj[name]
      if (readStream) {
        console.log('File found', name)

        const existingData: string[] = []
        const ss = fs.createReadStream(
          process.cwd() + `/src/data/soduku/${name}.json`,
          {autoClose: true, encoding: 'utf-8'},
        )

        const rl = Readline.createInterface({input: ss})

        for await (const line of rl) {
          existingData.push(line)
        }

        rl.on('end', (...rgs) => {
          console.log('ended File reading', rgs, name, existingData)
          const foundData = JSON.parse(existingData.join('')) as {
            total: number
            data: SodukuType[]
          }

          arr = arr.concat(foundData.data)
          arr = uniqWith(arr, isEqual)
          console.log('Finishing analyzing data', name)
        })
      }
      console.log('Writing start', name)
      const writeStream = fs.createWriteStream(
        process.cwd() + `/src/data/soduku/${name}.json`,
      )

      writeStream.write(
        JSON.stringify(
          {
            total: arr.length,
            data: arr,
          },
          null,
          2,
        ),
      )
      writeStream.end()
      console.log('finished writing', name)
    }
  })()
  console.log('all done')

  // ? ideally we want this form
  // ? 1- create a file for each rank segment ie: 5.0 - 5.9
  //  to make things faster
  // this will hopefully lower the numbers of sodukus
  // which will allow us to make an array for the solvable sodukus index and get a random one from them
  // ? 2- {total: arr.length; data:{id:string; soduku: string; rank: number}[]}
}

export async function readLocalFile(filePathFromAppDown: string) {
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
