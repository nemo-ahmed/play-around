'use client'
import useUSDaily from '@/hooks/useUSDaily'
import React, {useMemo} from 'react'
import {Chart, type ChartWrapperOptions} from 'react-google-charts'

const options: ChartWrapperOptions['options'] = {
  title: 'US Daily Timeseries',

  legend: {position: 'bottom'},
  animation: {
    duration: 1000,
    easing: 'out',
  },
  backgroundColor: 'transparent',
}

function USDailyTimeSeries() {
  const {data} = useUSDaily()

  const chartData = useMemo(
    () =>
      data?.data
        ?.reduce(
          (acc: [string, number][], item) =>
            acc.concat([[item.date, item.cases.total.value]]),
          [],
        )
        ?.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()) ??
      [],
    [data?.data],
  )
  return (
    <div className="rounded-md bg-slate-400 w-fit h-fit">
      <Chart
        options={options}
        chartType={'LineChart'}
        data={[['date', 'cases'], ...chartData]}
        chartVersion="51"
        height={400}
        width="600px"
      />
    </div>
  )
}

export default USDailyTimeSeries
