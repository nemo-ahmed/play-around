import USDailyTimeSeries from '@/components/USDailyTimeSeries'

export default function LineChart() {
  return (
    <div className="h-screen p-8 w-full flex items-center justify-center gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <USDailyTimeSeries />
    </div>
  )
}
