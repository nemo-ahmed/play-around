import React, {Suspense} from 'react'
import SodukuComp from './Cell'
import {SodukuType, SodukuTypeReturn} from '@/types/soduku'
import SodukuProvider from '@/context/Soduku'

async function Page() {
  const data = await fetch(
    'http://localhost:3000/api/soduku?rating=9&offset=0&limit=1',
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
