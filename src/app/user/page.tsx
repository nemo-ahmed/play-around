import {Params} from 'next/dist/server/request/params'
import React from 'react'

async function Page({searchParams}: {searchParams: Promise<Params>}) {
  const params = await searchParams
  return (
    <div className="h-[calc(100dvh-23.9px)] flex items-center justify-center">
      <h1 className="text-8xl capitalize">
        Welcome {params.firstName} {params.lastName}
      </h1>
    </div>
  )
}

export default Page
