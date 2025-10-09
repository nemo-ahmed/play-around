import {Fragment, type ReactNode, Suspense} from 'react'

function Active({
  isVisible,
  children,
}: {
  isVisible: boolean
  children: ReactNode
}) {
  return (
    <Fragment>
      <Suspense fallback={<h1>🌀 Loading...</h1>}>
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
