import React, {Suspense} from 'react'
import SodukuComp from './Soduku'
import SodukuProvider from '@/context/Soduku'
import {fetchSoduku} from '@/utils/soduku/fetchSoduku'
import {queryClient} from '@/other/queryclient'

async function Page({searchParams}: PageProps<'/soduku'>) {
  const rating = await searchParams
    .then(value => value.rating)
    .catch(() => undefined)

  await queryClient.prefetchQuery({
    queryKey: ['soduku', rating],
    queryFn: ({queryKey}) => fetchSoduku(queryKey[1]),
  })

  return (
    <div className="flex flex-col justify-around">
      <SodukuProvider>
        <Suspense>
          <SodukuComp rating={rating as string} />
        </Suspense>
      </SodukuProvider>
    </div>
  )
}

export default Page
