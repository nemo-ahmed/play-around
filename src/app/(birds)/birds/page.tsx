'use client'

import {useState} from 'react'

import Table from '@/components/Table'
import useBirdsWatch from '@/hooks/useBirdsWatch'

function BirdsWatching() {
  const [page, setPage] = useState(1)

  const {data, isFetching} = useBirdsWatch({page, query: 'cnt:portugal'})

  const onPageChange = (p: number) => setPage(prev => prev + p)

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
          <div className={commonStyles}>
            <span>Loaded Page</span>
            <span>
              {page ?? data?.page}/{data?.numPages}
            </span>
          </div>
        </div>
      </div>
      {data?.recordings && (
        <Table
          data={data.recordings}
          onPageChange={onPageChange}
          page={page ?? data.page}
          numPages={data.numPages}
          isFetching={isFetching}
        />
      )}
    </div>
  )
}

export default BirdsWatching
