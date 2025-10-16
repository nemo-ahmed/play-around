import {Fragment, Suspense, type JSX, type ReactNode} from 'react'

function Active({
  isVisible,
  children,
  fallback,
}: {
  isVisible: boolean
  children: ReactNode
  fallback?: JSX.Element
}) {
  return (
    <Fragment>
      <Suspense fallback={fallback ?? <h1>🌀 Loading...</h1>}>
        {
          // ? Replace after NextJS release support
          // (   <Activity mode={isVisible ? 'visible' : 'hidden'}>
          //     {children}
          //   </Activity>)
          isVisible ? children : null
        }
      </Suspense>
    </Fragment>
  )
}

export default Active
