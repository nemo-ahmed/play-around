import {readFile} from '@/utils/convertTxtToJson'
import {NextRequest, NextResponse} from 'next/server'

export async function GET() {
  // ? I was too lazy to convert 100k+ lines so i did this 🐨
  // console.log('reading')
  // const res = await readFile('/src/data/evilsoduku.txt')
  // console.log('converting')
  // const object = convertTxtToJson(res)
  // console.log('converting done, writing')
  // await writeDataToFile({
  //   name: 'evilsoduku',
  //   data: JSON.stringify(object, null, 2),
  // })

  // ? Ideally we want to chunk this file and send it in parts
  // ? But for now this is fine for now
  // ? Or maybe change it to array and offset it... 🤔
  const res = await readFile('/src/data/evilsoduku.json')

  return new Response(JSON.stringify(JSON.parse(res), null, 2), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json()

    // ? Some logic will be added if I ever user the endpoint 😆

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
