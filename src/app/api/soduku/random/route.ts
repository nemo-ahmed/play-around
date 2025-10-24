import {randomUUID} from 'node:crypto'

import {random} from 'lodash'
import type {NextRequest} from 'next/server'

import {SODUKU_DIFFICULTIES} from '@/consts/soduku'
import {generateSudoku} from './generate'


export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  // ? This is to keep things within user's decision
  const difficulty =
    params.get('difficulty') || SODUKU_DIFFICULTIES[random(0, 4)]

  const puzzle = generateSudoku(difficulty)
  const id = randomUUID()
  console.log(puzzle)
  // await handleFilesBeforeExecution(difficulty)
  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  // const res = await readLocalFile(`${difficulty}.json`)
  // const obj = JSON.parse(res) as SodukuPromiseReturn

  // let data = obj.data
  // const offset = random(0, obj.total - 1)
  // if (offset) {
  //   data = data.slice(Number(offset), offset + 1)
  // }
  // if (!Array.isArray(data) || data.length === 0) {
  //   return new Response('No Soduku found', {status: 500})
  // }
  return Response.json({...puzzle, difficulty, id})
}
