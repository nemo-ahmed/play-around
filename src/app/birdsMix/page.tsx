import genericFetch from '@/api/fetch'
import {BIRDS_URL} from '@/api/urls'
import Table from '@/components/Table'
import {BirdsWatchResponse} from '@/types/useBirds'
import {unstable_cache as withCache} from 'next/cache'

const getBirds = withCache(
  async () => {
    return await genericFetch<BirdsWatchResponse>({
      url: BIRDS_URL + '?query=cnt:portugal',
    })
  },
  ['birds'],
  {revalidate: 1000 * 60 * 60 * 24, tags: ['posts']},
)

export default async function BirdsMix() {
  const data = await getBirds()

  return (
    <div className="px-3 py-2.5 flex flex-col gap-2 bg-zinc-950 h-screen">
      <h1 className="text-gray-50">Birds Watching API</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-fit">
          <div className="shadow-md shadow-gray-700 flex flex-col items-center justify-center px-3 py-2.5 rounded-md bg-gray-500 gap-1">
            <span>Recordings</span>
            <span>{data?.numRecordings}</span>
          </div>
          <div className="shadow-md shadow-gray-700 flex flex-col items-center justify-center px-3 py-2.5 rounded-md bg-gray-500 gap-1">
            <span>Species</span>
            <span>{data?.numSpecies}</span>
          </div>
        </div>
      </div>
      {data?.recordings && (
        <Table
          data={data.recordings}
          numPages={data.numPages}
          isFetching={false}
        />
      )}
    </div>
  )
}
