import {BirdsWatchResponse} from '@/types/useBirds'
import genericFetch from '../../../utils/fetch'

const data = await genericFetch<BirdsWatchResponse>({
  url: 'https://xeno-canto.org/api/2/recordings?query=cnt:portugal',
})

export function GET() {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
}
