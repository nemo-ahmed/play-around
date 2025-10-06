'use client'
import React, {createContext, ReactNode, useSyncExternalStore} from 'react'
import {notificationsStore} from './some'
import {createPortal} from 'react-dom'
import {uniqueId} from 'lodash'

const Context = createContext({})
function NotificationProvider({children}: {children: ReactNode}) {
  const notifications = useSyncExternalStore(
    notificationsStore.subscribe,
    notificationsStore.getSnapshot,
    notificationsStore.getServerSnapshot,
  )
  return (
    <Context value={{notifications}}>
      {children}
      {createPortal(
        <ul className="fixed bottom-4 right-5 z-[9999909999] flex gap-4 justify-end flex-col">
          {notifications.map(notification => (
            <li key={notification.id}>{notification.ele}</li>
          ))}
        </ul>,
        document.body,
      )}
    </Context>
  )
}

export const notify = (props: Record<'title' | 'icon' | 'message', string>) => {
  const id = uniqueId()
  console.log(id)
  notificationsStore.addNotification({...props, id})
}

export default NotificationProvider
