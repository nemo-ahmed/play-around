import type {SodukuPromiseData} from '@/types/soduku'
import {appendOrCreateFile} from '@/utils/filesHandling/convertTxtToJson'
import type {NextRequest} from 'next/server'

export async function POST(req: NextRequest) {
  const data = (await req.json()) as SodukuPromiseData
  console.log(data)
  // ? Some logic will be added if I ever user the endpoint 😆

  // ? On Successful Finish
  // ? Add the index, id, and solution to a JSON file
  // ? Then cross reference the random numbers with the solved soduku(s) index
  // ? solved-{lvl}.json
  // ? {total: number[],data:{id: string,data: string,groupedBy:'grid'}[]}

  const res = await appendOrCreateFile({
    [`solved-${data.difficulty}`]: [data],
  })
    .then(() => 'success')
    .catch(err => `failed ${JSON.stringify(err)}`)

  return new Response(res, {
    status: res.includes('failed') ? 204 : 200,
    headers: {'Content-Type': 'application/json'},
  })
  // console.log(error)
  // return new Response('error', {status: 500})
}
