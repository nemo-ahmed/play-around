import {zippingFiles} from '@/utils/filesHandling/zipping'

export async function GET() {
  // ? to avoid any complex file upload tactics we are using this file to trigger the convert data fn
  // await convertTxtToJsonFiles('medium.txt')
  try {
    await zippingFiles('soduku')
    return new Response(JSON.stringify({data: 123}, null, 2), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    })
  } catch (error) {
    return new Response(JSON.stringify({error: 'Failed to save.'}, null, 2), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    })
  }
  // await unzipping('soduku')
}
