import {BirdsWatchResponse} from '@/types/useBirds'

import genericFetch from '../../../../utils/fetch'
import {BIRDS_URL} from '../../../../utils/urls'

export async function GET() {
  const data = await genericFetch<BirdsWatchResponse>({
    url: BIRDS_URL + '?query=cnt:portugal',
  })

  const ids = data.recordings.map(({id, en}) => ({id, en}))

  return new Response(JSON.stringify(ids), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
