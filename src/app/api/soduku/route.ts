import {SodukuType} from '@/types/soduku'
import {readFile} from '@/utils/convertTxtToJson'
import {NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const offset = params.get('offset') || '0'
  const limit = params.get('limit') || '10'
  const rating = params.get('rating')

  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  const res = await readFile('/src/data/evilsoduku.json')
  let arr = Object.values(JSON.parse(res)) as SodukuType[]

  if (rating) {
    arr = arr.filter(item => item.rating >= rating)
  }

  if (arr.length === 0) {
    return new Response(
      `No Data found that is equal or higher than the given rating.`,
      {status: 204},
    )
  }
  const data = arr.slice(Number(offset), Number(offset) + Number(limit))
  return new Response(JSON.stringify(data, null, 2), {
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
    // ? {indexes: number[],sodukus:{id: string,data: string,groupedBy:'grid'}[]}

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
