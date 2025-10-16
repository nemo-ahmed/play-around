import {useSoduku} from '@/context/soduku/Soduku'
import dayjs from 'dayjs'
import {useEffect, useState} from 'react'

export function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [{isPlaying}] = useSoduku()
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined
    console.log(isPlaying)
    if (!isPlaying) {
      clearInterval(interval)
      return
    }
    interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isPlaying, seconds])

  return dayjs(new Date('1/1/2020 00:00:00').toLocaleDateString())
    .set('seconds', seconds)
    .format('HH:mm:ss')
}
