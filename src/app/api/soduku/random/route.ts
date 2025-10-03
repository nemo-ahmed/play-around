import {readLocalFile} from '@/utils/filesHandling/convertTxtToJson'
import {random} from 'lodash'
import type {SodukuPromiseReturn} from '@/types/soduku'
import type {NextRequest} from 'next/server'
import {handleFilesBeforeExecution} from '../util'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams

  // ? This is to keep things within user's decision
  const rating = params.get('rating') || random(1, 9).toString()

  await handleFilesBeforeExecution(rating)
  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  const res = await readLocalFile(`${rating}.json`)
  const obj = JSON.parse(res) as SodukuPromiseReturn

  let data = obj.data
  const offset = random(0, obj.total - 1)
  if (offset) {
    data = data.slice(Number(offset), offset + 1)
  }
  if (!Array.isArray(data) || data.length === 0) {
    return new Response('No Soduku found', {status: 500})
  }
  return Response.json({total: obj.total, data})
}
