'use client'

import Table from '@/components/Table'
import useBirdsWatch from '@/hooks/useBirdsWatch'
import React from 'react'

function BirdsWatching() {
  const {data} = useBirdsWatch()

  return (
    <div className="px-3 py-2.5 flex flex-col gap-2">
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
            <span>Page</span>
            <span>
              {data?.page}/{data?.numPages}
            </span>
          </div>
        </div>
      </div>
      {data?.recordings && <Table data={data?.recordings} />}
    </div>
  )
}

export default BirdsWatching
