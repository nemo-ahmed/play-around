import React, {createContext, ReactNode, useSyncExternalStore} from 'react'
import {todosStore as notificationsStore} from './some'
import {createPortal} from 'react-dom'

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
        <ul className="fixed bottom-0 right-0 z-[9999909999]">
          {notifications.map(notification => (
            <li key={notification.id} className="m-4">
              {notification.ele}
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </Context>
  )
}

export const notify = (props: Record<'title' | 'icon' | 'message', string>) =>
  notificationsStore.addNotification(props)

export default NotificationProvider
