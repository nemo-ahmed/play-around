import React, {Suspense} from 'react'
import SodukuComp from './Soduku'
import {SodukuTypeReturn} from '@/types/soduku'
import SodukuProvider from '@/context/Soduku'
import {AppRoutes} from '../../../.next/types/routes'

async function Page({searchParams}: PageProps<AppRoutes>) {
  const rating = await searchParams
    .then(value => value.rating)
    .catch(() => undefined)
  const data = await fetch(
    `http://localhost:3000/api/soduku/random?rating=${rating}`,
  )
    .then(async res => (await res.json()) as SodukuTypeReturn)
    .catch(err => {
      console.error(err)
    })
  console.log(data)
  return (
    <div className="flex flex-col justify-around">
      <Suspense>
        {data ? (
          <SodukuProvider data={data} key={data.data[0].id}>
            <SodukuComp data={data} key={data.data[0].id} />
          </SodukuProvider>
        ) : null}
      </Suspense>
    </div>
  )
}

export default Page
