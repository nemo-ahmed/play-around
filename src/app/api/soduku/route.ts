import {SodukuType, SodukuTypeReturn} from '@/types/soduku'
import {convertTxtDataToJsonData, readFile} from '@/utils/convertTxtToJson'
import {NextRequest} from 'next/server'

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

  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  const res = await readFile(`/src/data/soduku/${rating}.json`)
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

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // ? Some logic will be added if I ever user the endpoint 😆

    // ? On Successful Finish
    // ? Add the index, id, and solution to a JSON file
    // ? Then cross reference the random numbers with the solved soduku(s) index
    // ? solved-{lvl}.json
    // ? {total: number[],data:{id: string,data: string,groupedBy:'grid'}[]}

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    })
  } catch (error) {
    console.log(error)
    return new Response('error', {status: 500})
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
