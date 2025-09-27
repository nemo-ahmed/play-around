import React, {Suspense} from 'react'
import SodukuComp from './Soduku'
import SodukuProvider from '@/context/Soduku'
import {fetchSoduku} from '@/utils/fetchSoduku'

async function Page({searchParams}: PageProps<'/soduku'>) {
  const rating = await searchParams
    .then(value => value.rating)
    .catch(() => undefined)
  const data = await fetchSoduku(rating)
  console.log(data)
  return (
    <div className="flex flex-col justify-around">
      <Suspense>
        {data ? (
          <SodukuProvider data={data} key={data.data[0].id}>
            <SodukuComp key={data.data[0].id} rating={rating as string} />
          </SodukuProvider>
        ) : null}
      </Suspense>
    </div>
  )
}

export default Page
