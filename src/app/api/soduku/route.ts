import {readLocalFile} from '@/utils/filesHandling/convertTxtToJson'
import type {SodukuPromiseReturn} from '@/types/soduku'
import type {NextRequest} from 'next/server'
import {random} from '@/other/exports'
import {handleFilesBeforeExecution} from './util'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const offset = params.get('offset')
  const limit = params.get('limit')
  const rating = params.get('rating') || random(1, 9).toString()

  // convertTxtDataToJsonData('evilsoduku.txt')
  return new Response('No implementation', {
    status: 404,
  })
  if (!rating) {
    return new Response('You need to set a rating', {
      status: 404,
    })
  } else if (rating && Number(rating) <= 9 && Number(rating) >= 1) {
    return new Response(`No soduku's found for this rating ${rating}`, {
      status: 404,
    })
  }

  await handleFilesBeforeExecution(rating)

  const res = await readLocalFile(`${rating}.json`)
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
