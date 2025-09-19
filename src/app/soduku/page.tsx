import React, {Suspense} from 'react'
import SodukuComp from './cell'
import {SodukuTypeReturn} from '@/types/soduku'
import SodukuProvider from '@/context/Soduku'

async function Page() {
  const data = await fetch('http://localhost:3000/api/soduku')
    .then(async res => (await res.json()) as SodukuTypeReturn)
    .catch(err => {
      console.error(err)
    })
  return (
    <div className="flex flex-col gap-4">
      <Suspense>
        {data?.map(puzzle => (
          <SodukuProvider data={puzzle} key={puzzle.id}>
            <SodukuComp key={puzzle.id} />
          </SodukuProvider>
        ))}
      </Suspense>
    </div>
  )
}

export default Page
