import SodukuProvider from '@/context/soduku/Soduku'
import React from 'react'
import SodukuComp from '../Soduku'
import type {SodukuDifficulties} from '@/types/soduku'

async function Page({params}: PageProps<'/soduku/[difficulty]'>) {
  const difficulty = (await params).difficulty as SodukuDifficulties
  return (
    <SodukuProvider difficulty={difficulty}>
      <SodukuComp />
    </SodukuProvider>
  )
}

export default Page
