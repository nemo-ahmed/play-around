import {readLocalFile} from '@/utils/filesHandling/convertTxtToJson'
import {random} from 'lodash'
import type {SodukuTypeReturn} from '@/types/soduku'
import type {NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams

  // ? This is to keep things within user's decision
  const rating = params.get('rating') || random(1, 9)

  // convertTxtDataToJsonData('evilsoduku.txt')

  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  const res = await readLocalFile(`/src/data/soduku/${rating}.json`)
  const obj = JSON.parse(res) as SodukuTypeReturn

  let data = obj.data
  const offset = random(0, obj.total - 1)
  if (offset) {
    data = data.slice(Number(offset), offset + 1)
  }

  return new Response(JSON.stringify({total: obj.total, data}, null, 2), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
