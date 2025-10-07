'use client'
import React, {createContext, ReactNode, useSyncExternalStore} from 'react'
import {notificationsStore} from './some'
import {uniqueId} from 'lodash'
import dynamic from 'next/dynamic'

const NotificationPortal = dynamic(() => import('./portal'), {
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

export const notify = (props: Record<'title' | 'icon' | 'message', string>) => {
  const id = uniqueId()
  console.log(id)
  notificationsStore.addNotification({...props, id})
}

export default NotificationProvider
