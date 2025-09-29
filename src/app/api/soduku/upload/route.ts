import {zippingFiles} from '@/utils/filesHandling/zipping'
import {type NextRequest} from 'next/server'

export async function GET(req: NextRequest) {
  // ? to avoid any complex file upload tactics we are using this file to trigger the convert data fn
  // await convertTxtToJsonFiles('medium.txt')
  await zippingFiles('soduku')
  // await unzipping('soduku')
  return new Response(JSON.stringify({data: 123}, null, 2), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
