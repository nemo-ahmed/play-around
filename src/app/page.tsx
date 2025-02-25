'use client'
import USDailyTimeSeries from '@/components/USDailyTimeSeries'
import useUSDaily from '@/hooks/useUSDaily'

export default function Home() {
  useUSDaily()
  return (
    <div className="h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <USDailyTimeSeries />
      </main>
    </div>
  )
}
