'use client'
import useUSDaily from '@/hooks/useUSDaily'
import React, {useMemo} from 'react'
import {Chart, type ChartWrapperOptions} from 'react-google-charts'

const options: ChartWrapperOptions['options'] = {
  title: 'US Daily Timeseries',
  legend: {position: 'bottom'},
  //   curveType: 'function',
  animation: {
    duration: 1000,
    easing: 'out',
  },
  intervals: {style: 'line'},
  backgroundColor: 'transparent',
}

function USDailyTimeSeries() {
  const {data} = useUSDaily()
  const chartData = useMemo(
    () =>
      data?.data
        ?.reduce(
          (acc: (number | string)[][], item) =>
            acc.concat([[item.date, item.cases.total.value]]),
          [],
        )
        ?.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()) ??
      [],
    [data?.data],
  )
  console.log(chartData)
  return (
    <div className="rounded-md bg-slate-400 w-full h-fit w-[500px]">
      <Chart
        options={options}
        chartType={'AreaChart'}
        data={[['date', 'Cases'], ...chartData]}
        chartVersion="51"
        height={400}
        width="100%"
        formatters={[{type: 'NumberFormat', column: 0, options: {}}]}
      />
    </div>
  )
}

export default USDailyTimeSeries
