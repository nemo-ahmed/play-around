import {NextResponse, NextRequest} from 'next/server'
import {unzippingFile} from './utils/filesHandling/zipping'
import {checkIfFileExist} from './utils/filesHandling/checkFile'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const rating = request.nextUrl.searchParams.get('rating')
  console.log(
    'middleware',
    request.url,
    request.nextUrl.searchParams.get('rating'),
  )
  // unzip the needed file
  //   if (rating && !checkIfFileExist(`${rating}.json`)) {
  //     const promises = [unzippingFile(`${rating}.json.gz`)]
  //     if (checkIfFileExist(`solved-${rating}.json.gz`)) {
  //       promises.push(unzippingFile(`solved-${rating}.json.gz`))
  //     }
  //     await Promise.all(promises)
  //   }
  // return NextResponse.redirect(new URL('/home', request.url))
}

export const config = {
  matcher: ['/api/soduku', '/api/soduku/random'],
}
