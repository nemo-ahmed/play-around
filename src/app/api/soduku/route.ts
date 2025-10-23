import type {NextRequest} from 'next/server'

import {random} from '@/other/exports'
import type {SodukuPromiseReturn} from '@/types/soduku'
import {readLocalFile} from '@/utils/filesHandling/convertTxtToJson'

import {handleFilesBeforeExecution} from './util'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const offset = params.get('offset')
  const limit = params.get('limit')
  const difficulty = params.get('difficulty') || random(1, 9).toString()

  // convertTxtDataToJsonData('evilsoduku.txt')
  return new Response('No implementation', {
    status: 404,
  })
  if (!difficulty) {
    return new Response('You need to set a difficulty', {
      status: 404,
    })
  } else if (difficulty && Number(difficulty) <= 9 && Number(difficulty) >= 1) {
    return new Response(`No soduku's found for this difficulty ${difficulty}`, {
      status: 404,
    })
  }

  await handleFilesBeforeExecution(difficulty)

  const res = await readLocalFile(`${difficulty}.json`)
  const obj = JSON.parse(res)

  let data = obj.data
  if (offset || limit) {
    data = data.slice(Number(offset), Number(offset) + Number(limit))
  }
  if (!Array.isArray(data) || data.length === 0) {
    return new Response('No Soduku found', {status: 500})
  }
  return Response.json({total: obj.total, data})
}
