'use client'
import {uniqueId} from 'lodash'
import dynamic from 'next/dynamic'
import React, {createContext, ReactNode, useSyncExternalStore} from 'react'

import {notificationsStore, Props} from './helpers'

const NotificationPortal = dynamic(() => import('./Portal'), {
  ssr: false,
})

const Context = createContext({})
function NotificationProvider({children}: {children: ReactNode}) {
  'use client'
  const notifications = useSyncExternalStore(
    notificationsStore.subscribe,
    notificationsStore.getSnapshot,
    notificationsStore.getServerSnapshot,
  )
  return (
    <Context value={{notifications}}>
      {children}
      <NotificationPortal notifications={notifications} />
    </Context>
  )
}

export const notify = (props: Omit<Props, 'id'>) => {
  const id = uniqueId()
  notificationsStore.addNotification({...props, id})
}

export default NotificationProvider
