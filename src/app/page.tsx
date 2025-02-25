'use client'
import genericFetch from '@/api/fetch'
import {useQuery} from '@tanstack/react-query'
import Image from 'next/image'

export default function Home() {
  useQuery({
    queryFn: () =>
      genericFetch({url: 'https://api.covidtracking.com/v2/us/daily.json'}),
    queryKey: ['k'],
  })
  return (
    <div className="h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className=""></main>
    </div>
  )
}
