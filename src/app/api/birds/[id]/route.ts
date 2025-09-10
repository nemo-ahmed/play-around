import {BirdsWatchResponse} from '@/types/useBirds'
import genericFetch from '../../../../utils/fetch'
import {BIRDS_URL} from '../../../../utils/urls'
import {NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const data = await genericFetch<BirdsWatchResponse>({
    url: BIRDS_URL + '?query=cnt:portugal',
  })
  const searchParams = request.nextUrl.searchParams
  const requestedID = searchParams.get('id')

  const requestedIdData = data.recordings.filter(
    ({id}) => id === requestedID,
  )[0]

  if (!requestedIdData?.id) {
    return new Response(JSON.stringify(requestedIdData), {
      status: 204,
      headers: {'Content-Type': 'application/json'},
    })
  }
  return new Response(JSON.stringify(requestedIdData), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
