import SodukuProvider from '@/context/soduku/Soduku'
import React from 'react'
import SodukuComp from '../../../components/soduku/Soduku'
import type {SodukuDifficulties} from '@/types/soduku'

async function Page({params}: PageProps<'/soduku/[difficulty]'>) {
  const difficulty = (await params).difficulty as SodukuDifficulties | 'random'
  return (
    <SodukuProvider difficulty={difficulty}>
      <SodukuComp />
    </SodukuProvider>
  )
}

export default Page
