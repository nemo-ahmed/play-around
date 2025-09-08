import 'server-only'

import genericFetch from '@/api/fetch'
import {BIRDS_URL} from '@/api/urls'
import {BirdsWatchResponse} from '@/types/useBirds'
import {unstable_cache as withCache} from 'next/cache'
import {lazy, Suspense} from 'react'

const getBirds = withCache(
  async () => {
    return await genericFetch<BirdsWatchResponse>({
      url: BIRDS_URL + '?query=cnt:portugal',
    })
  },
  ['birds'],
  {revalidate: 1000 * 60 * 60 * 24, tags: ['posts']},
)

const Table = lazy(() =>
  getBirds().then(() => {
    console.log('data loaded')
    return import('@/components/Table')
  }),
)

export default async function BirdsMix() {
  const data = await getBirds()
  const commonStyles = 'card'

  return (
    <div className="px-3 py-2.5 flex flex-col gap-2 h-screen">
      <h1 className="text-gray-950 dark:text-gray-50">Birds Watching API</h1>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2 w-fit">
          <div className={commonStyles}>
            <span>Recordings</span>
            <span>{data?.numRecordings}</span>
          </div>
          <div className={commonStyles}>
            <span>Species</span>
            <span>{data?.numSpecies}</span>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>loading...</div>}>
        {data?.recordings && (
          <Table
            data={data.recordings}
            numPages={data.numPages}
            isFetching={false}
          />
        )}
      </Suspense>
    </div>
  )
}
