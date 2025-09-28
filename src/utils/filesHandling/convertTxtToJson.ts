import type {SodukuType} from '@/types/soduku'
import fs from 'fs'
import {uniqWith, isEqual} from '@/other/exports'
import Readline from 'node:readline'
import {getPath} from './getPath'

// ! look into this
// import {createGzip} from 'node:zlib'

export async function convertTxtToJsonFiles(fileName: string) {
  if (!fileName.includes('.txt')) {
    throw new Error('invalid file type')
  }
  const rs = fs.createReadStream(getPath(fileName), 'utf8')
  // ? This is awesome for correctly reading lines
  const rl = Readline.createInterface({input: rs})
  const obj: Record<string, SodukuType[]> = {}
  console.log('handling lines')
  for await (const line of rl) {
    // ? Ignoring comment lines
    if (line.startsWith('//')) {
      continue
    } else {
      const [id, soduku, rating] = (line as string).split(/\s+/) as ['', '', '']
      const key = Math.floor(Number(rating)).toString()
      if (key !== 'NaN') {
        obj[key] = [...(obj[key] ?? []), {id, soduku, rating}]
      }
    }
  }

  console.log('Started Writing/checking', Object.keys(obj).length)
  appendOrCreateFile(obj)
}

export async function appendOrCreateFile(obj: Record<string, SodukuType[]>) {
  for await (const filename of Object.keys(obj)) {
    const readStream = fs.existsSync(getPath(filename + '.json'))

    let arr = obj[filename]
    if (readStream) {
      console.log('File found', filename)

      const existingData: string[] = []
      const ss = fs.createReadStream(getPath(filename + '.json'), {
        autoClose: true,
        encoding: 'utf-8',
      })

      const rl = Readline.createInterface({input: ss})

      for await (const line of rl) {
        existingData.push(line)
      }

      rl.on('end', (...rgs) => {
        console.log('ended File reading', rgs, filename, existingData)
        const foundData = JSON.parse(existingData.join('')) as {
          total: number
          data: SodukuType[]
        }

        arr = arr.concat(foundData.data)
        arr = uniqWith(arr, isEqual)
        console.log('Finishing analyzing data', filename)
      })
    }
    const writeStream = fs
      .createWriteStream(getPath(filename + '.json'))
      .on('ready', () => {
        console.log('Writing start', filename)
      })

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
    writeStream.end(() => {
      console.log('finished writing', filename)
    })
  }

  console.log('all done')

  // ? ideally we want this form
  // ? 1- create a file for each rank segment ie: 5.0 - 5.9
  //  to make things faster
  // this will hopefully lower the numbers of sodukus
  // which will allow us to make an array for the solvable sodukus index and get a random one from them
  // ? 2- {total: arr.length; data:{id:string; soduku: string; rank: number}[]}
}

export async function readLocalFile(filename: string) {
  return await fs.promises
    .readFile(getPath(filename), 'utf8')
    .then(data => {
      return data.toString()
    })
    .catch(() => 'error')
}

// ? To Update a file you need first to read it
// ? Merge its content with the new data then pass it as a string
export async function writeDataToFile({
  filename,
  data,
}: {
  filename: string
  data: string
}) {
  return await fs.promises.writeFile(getPath(filename + '.json'), data, 'utf8')
}
