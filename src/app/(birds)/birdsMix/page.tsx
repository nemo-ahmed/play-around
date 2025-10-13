import {lazy, Suspense} from 'react'
import {BirdsWatchResponse} from '@/types/useBirds'

const getBirds = async () =>
  await fetch(process.env.URL + '/api/birds/')
    .then(async res => (await res.json()) as BirdsWatchResponse)
    .catch(e => console.error(e))

const Table = lazy(() =>
  getBirds().then(() => {
    return import('@/components/Table')
  }),
)

export default async function BirdsMix() {
  const data = await getBirds()

  const commonStyles = 'card'

  return (
    <div className="px-3 py-2.5 flex flex-col gap-2">
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
