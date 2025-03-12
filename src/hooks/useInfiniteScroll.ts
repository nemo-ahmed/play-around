import {UIEventHandler, useCallback, useState} from 'react'

const MAX_ON_DISPLAY_DATA_SIZE = 300
const MIN_ON_DISPLAY_DATA_SIZE = 100
const INCREMENT_BY = 12

function useInfiniteScroll<T = unknown>({
  data = [],
  total,
  isFetching,
  onPageChange,
  numPages,
  page,
}: {
  data?: T[]
  total?: number
  page?: number
  numPages?: number
  isFetching?: boolean
  onPageChange: (p: number) => void
}) {
  console.log(data)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(100)
  const [displayData, setDisplayData] = useState(data.slice(0, end))
  const stackTotal = total ?? data.length

  // TODO: Change Page to Indexing
  const onScroll = useCallback<UIEventHandler<HTMLTableSectionElement>>(
    e => {
      if (data.length <= MIN_ON_DISPLAY_DATA_SIZE || isFetching) return
      const scrollProgress =
        (e.currentTarget.scrollTop + e.currentTarget.offsetHeight) /
        e.currentTarget.scrollHeight

      if (
        scrollProgress < 0.25 &&
        end - MAX_ON_DISPLAY_DATA_SIZE > 0 &&
        start > 0
      ) {
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
        if (start > 0) {
          setStart(newStart)
        }

        if (newEnd > MAX_ON_DISPLAY_DATA_SIZE) {
          setEnd(newEnd)
        }
        if (
          page &&
          numPages &&
          page > 1 &&
          start < data.length * 0.1 &&
          !isFetching
        ) {
          onPageChange(-1)
        }
      }

      if (scrollProgress > 0.75 && end < stackTotal) {
        const newEnd = end + INCREMENT_BY
        setDisplayData(
          data.slice(start, newEnd < stackTotal ? newEnd : stackTotal),
        )
        setEnd(newEnd < stackTotal ? newEnd : stackTotal)
        if (displayData.length > MAX_ON_DISPLAY_DATA_SIZE) {
          setStart(prev => prev + INCREMENT_BY)
        }
        if (page && numPages && page < numPages && end > data.length * 0.9) {
          onPageChange(1)
        }
      }
    },
    [
      data,
      isFetching,
      end,
      stackTotal,
      start,
      displayData.length,
      page,
      numPages,
      onPageChange,
    ],
  )
  return {data: displayData, onScroll}
}

export default useInfiniteScroll
