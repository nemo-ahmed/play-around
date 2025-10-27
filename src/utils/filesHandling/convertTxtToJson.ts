import fs from 'fs'
import Readline from 'node:readline'


import {uniqWith, isEqual} from '@/other/exports'
import type {SodukuPromiseData} from '@/types/soduku'

import {checkIfFileExist} from './checkFile'
import {getPath} from './getPath'
import {zippingFile} from './zipping'

// ! look into this
// import {createGzip} from 'node:zlib'

export async function convertTxtToJsonFiles(fileName: string) {
  if (!fileName.includes('.txt')) {
    throw new Error('invalid file type')
  }
  const rs = fs.createReadStream(getPath(fileName), 'utf8')
  // ? This is awesome for correctly reading lines
  const rl = Readline.createInterface({input: rs})
  const obj: Record<string, unknown[]> = {}
  console.log('handling lines')
  for await (const line of rl) {
    // ? Ignoring comment lines
    if (line.startsWith('//')) {
      continue
    } else {
      const [id, soduku, difficulty] = (line as string).split(/\s+/) as [
        '',
        '',
        '',
      ]
      const key = Math.floor(Number(difficulty)).toString()
      if (key !== 'NaN') {
        obj[key] = [...(obj[key] ?? []), {id, soduku, difficulty}]
      }
    }
  }

  console.log('Started Writing/checking', Object.keys(obj).length)
  appendOrCreateFile(obj)
}

export async function appendOrCreateFile(obj: Record<string, unknown[]>) {
  // ! File didnt append the new Solution
  for await (const filename of Object.keys(obj)) {
    let arr = obj[filename]
    const existingData: string[] = []
    if (checkIfFileExist(filename + '.json')) {
      console.log('File found', filename)

      const ss = fs.createReadStream(getPath(filename + '.json'), {
        autoClose: true,
        encoding: 'utf-8',
      })

      const rl = Readline.createInterface({input: ss})

      for await (const line of rl) {
        existingData.push(line)
      }

      arr.unshift(
        ...(
          JSON.parse(existingData.join('')) as {
            total: number
            data: SodukuPromiseData[]
          }
        ).data,
      )
      arr = uniqWith(arr, isEqual)
    }
    const newFilename = filename + '.json'
    const writeStream = fs
      .createWriteStream(getPath(newFilename))
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
    await zippingFile(newFilename, true)
  }

  console.log('all done')
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
