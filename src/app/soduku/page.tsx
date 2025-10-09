import React, {Suspense} from 'react'
import SodukuComp from './Soduku'
import SodukuProvider from '@/context/soduku/Soduku'
import {fetchSoduku} from '@/utils/soduku'
import {queryClient} from '@/other/queryclient'

async function Page({searchParams}: PageProps<'/soduku'>) {
  const rating = await searchParams
    .then(value => value.rating as string)
    .catch(() => undefined)

  await queryClient.prefetchQuery({
    queryKey: ['soduku', rating ?? '1'],
    queryFn: () => fetchSoduku(rating),
  })

  return (
    <div className="flex flex-col justify-around">
      <SodukuProvider rating={rating}>
        <Suspense>
          <SodukuComp />
        </Suspense>
      </SodukuProvider>
    </div>
  )
}

export default Page
