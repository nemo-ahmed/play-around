import {UIEventHandler, useCallback, useState} from 'react'

const MAX_ON_DISPLAY_DATA_SIZE = 300
const MIN_ON_DISPLAY_DATA_SIZE = 100
const INCREMENT_BY = 12

function useInfiniteScroll<T = unknown>({data}: {data: T[]}) {
  const [current, setCurrent] = useState(100)
  const [displayData, setDisplayData] = useState(data.slice(0, current))
  const onScroll = useCallback<UIEventHandler<HTMLTableSectionElement>>(
    e => {
      if (data.length <= MIN_ON_DISPLAY_DATA_SIZE) return
      if (
        (e.currentTarget.scrollTop + e.currentTarget.offsetHeight) /
          e.currentTarget.scrollHeight >
        0.75
      ) {
        setDisplayData(prev => {
          return prev.concat(data.slice(current, current + INCREMENT_BY))
        })
        setCurrent(prev => prev + INCREMENT_BY)
      }
    },
    [current, data],
  )
  return {data: displayData, onScroll}
}

export default useInfiniteScroll
