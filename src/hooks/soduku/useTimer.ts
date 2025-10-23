import dayjs from 'dayjs'
import {useEffect, useEffectEvent, useState} from 'react'

import {useSoduku} from '@/context/soduku/Soduku'

export function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [{isPlaying}] = useSoduku()

  const countUp = useEffectEvent(() => {
    setSeconds(prev => prev + 1)
  })

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined
    console.log(isPlaying)
    if (!isPlaying) {
      clearInterval(interval)
      return
    }
    interval = setInterval(() => {
      countUp()
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [isPlaying, seconds])

  return dayjs(new Date('1/1/2020 00:00:00').toLocaleDateString())
    .set('seconds', seconds)
    .format('HH:mm:ss')
}
