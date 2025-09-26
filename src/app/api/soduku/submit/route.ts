import type {NextRequest} from 'next/server'

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
