import {UIEventHandler, useCallback, useState} from 'react'

const MAX_ON_DISPLAY_DATA_SIZE = 300
const MIN_ON_DISPLAY_DATA_SIZE = 100
const INCREMENT_BY = 12

function useInfiniteScroll<T = unknown>({data}: {data: T[]}) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(100)
  const [displayData, setDisplayData] = useState(data.slice(0, end))
  const onScroll = useCallback<UIEventHandler<HTMLTableSectionElement>>(
    e => {
      if (data.length <= MIN_ON_DISPLAY_DATA_SIZE) return
      const scrollProgress =
        (e.currentTarget.scrollTop + e.currentTarget.offsetHeight) /
        e.currentTarget.scrollHeight

      if (scrollProgress < 0.25 && end - MAX_ON_DISPLAY_DATA_SIZE > 0) {
        const currentOtherEnd = end - MAX_ON_DISPLAY_DATA_SIZE
        const newStart = start - INCREMENT_BY
        const newEnd = end - INCREMENT_BY
        if (currentOtherEnd <= 0) return
        setDisplayData(
          data.slice(
            newStart <= 0 ? 0 : newStart,
            newEnd > MAX_ON_DISPLAY_DATA_SIZE
              ? newEnd
              : MAX_ON_DISPLAY_DATA_SIZE,
          ),
        )
        if (newStart > 0) {
          setStart(newStart)
        }

        if (newEnd > MAX_ON_DISPLAY_DATA_SIZE) {
          setEnd(newEnd)
        }
      }

      if (scrollProgress > 0.75) {
        setDisplayData(data.slice(start, end + INCREMENT_BY))
        setEnd(prev => prev + INCREMENT_BY)
        if (displayData.length > MAX_ON_DISPLAY_DATA_SIZE) {
          setStart(prev => prev + INCREMENT_BY)
        }
      }
    },
    [data, end, start, displayData.length],
  )
  return {data: displayData, onScroll}
}

export default useInfiniteScroll
