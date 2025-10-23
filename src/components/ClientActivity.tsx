import {Activity, type ReactNode} from 'react'

function Active({
  isVisible,
  children,
}: {
  isVisible: boolean
  children: ReactNode
}) {
  return <Activity mode={isVisible ? 'visible' : 'hidden'}>{children}</Activity>
}

export default Active
