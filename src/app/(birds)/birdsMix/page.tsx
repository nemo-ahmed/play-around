import {Suspense} from 'react'

import Active from '@/components/ClientActivity'
import Table from '@/components/Table'
import {BirdsWatchResponse} from '@/types/useBirds'

const getBirds = async () =>
  await fetch(process.env.URL + '/api/birds/')
    .then(async res => (await res.json()) as BirdsWatchResponse)
    .catch(e => {
      console.log(e)
      return {
        message: 'error',
        numPages: 0,
        numRecordings: 0,
        numSpecies: 0,
        recordings: [],
      }
    })

export default async function BirdsMix() {
  'use cache'
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
      <Active isVisible={!!data?.message}>
        <p className="text-red-500 text-center">Failed to load data</p>
      </Active>
      <Table
        data={(data as Required<BirdsWatchResponse>).recordings}
        numPages={(data as Required<BirdsWatchResponse>).numPages}
        isFetching={false}
      />
    </div>
  )
}
