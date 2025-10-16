import {useTimer} from '@/hooks/soduku/useTimer'

function Timer() {
  const duration = useTimer()

  return <h3 className="text-end text-rich-black-100">{duration}</h3>
}

export default Timer
