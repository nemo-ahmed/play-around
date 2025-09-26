import {readLocalFile} from '@/utils/convertTxtToJson'
import type {SodukuTypeReturn} from '@/types/soduku'
import type {NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const offset = params.get('offset')
  const limit = params.get('limit')
  const rating = params.get('rating')

  // convertTxtDataToJsonData('evilsoduku.txt')

  if (!rating) {
    return new Response('You need to set a rating', {
      status: 404,
    })
  } else if (!['5', '6', '7', '8', '9'].includes(rating)) {
    return new Response(`No soduku's found for this rating ${rating}`, {
      status: 404,
    })
  }

  const res = await readLocalFile(`/src/data/soduku/${rating}.json`)
  const obj = JSON.parse(res) as SodukuTypeReturn

  let data = obj.data
  if (offset || limit) {
    data = data.slice(Number(offset), Number(offset) + Number(limit))
  }
  return new Response(JSON.stringify({total: obj.total, data}, null, 2), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
