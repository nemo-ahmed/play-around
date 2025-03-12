import {useMemo, useRef} from 'react'

const IfNoOnDataReturn = <T>(obj: Record<string, T>) => Object.values(obj)

function useInfiniteData<T>({
  data,
  page,
  onDataReturn = IfNoOnDataReturn,
  isLoading,
}: {
  data: T
  isLoading: boolean
  page: number
  onDataReturn: (obj: Record<string, T>) => T | T[]
}) {
  const dataStack = useRef<Record<string, T>>({})
  const dataS = useMemo(() => {
    if (isLoading) return dataStack.current
    dataStack.current[page.toString()] = data
    return dataStack.current
  }, [data, isLoading, page])

  return useMemo(() => onDataReturn(dataS), [onDataReturn, dataS])
}

export default useInfiniteData
