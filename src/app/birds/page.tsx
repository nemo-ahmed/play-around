'use client'

import Table from '@/components/Table'
import useBirdsWatch from '@/hooks/useBirdsWatch'
import React, {useCallback, useState} from 'react'

function BirdsWatching() {
  const [page, setPage] = useState(1)

  const {data, isFetching} = useBirdsWatch({page, query: 'cnt:portugal'})

  const onPageChange = useCallback((p: number) => setPage(prev => prev + p), [])

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
          <div className="shadow-md shadow-gray-700 flex flex-col items-center justify-center px-3 py-2.5 rounded-md bg-gray-500 gap-1">
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
