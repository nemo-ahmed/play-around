'use client'
import {cx} from '@/other/exports'
import {motion} from 'motion/react'
import React from 'react'
import {IoClose} from 'react-icons/io5'

export const NotificationComponent = ({
  title,
  message,
  icon,
  id,
}: {
  title: string
  id: string
  message: string
  icon: string
}) => {
  const containerStyles =
    'flex gap-2 items-center pl-3 pr-1 py-2.5 text-eerie-black-400 dark:text-eerie-black-800'

  const timer = setTimeout(() => {
    notificationsStore.removeNotification(id)
    clearTimeout(timer)
  }, 2000)

  return (
    <motion.div
      className="w-3xs bg-eerie-black-900 dark:bg-eerie-black-300 rounded-md shadow shadow-eerie-black"
      initial={{
        x: 256,
      }}
      animate={{x: 0}}
      transition={{type: 'spring'}}
      exit={{x: 256}}
      onEnded={() => {
        console.log('done')
      }}
      onAnimationEnd={() => {
        console.log('done')
      }}
    >
      <div
        className={cx(
          containerStyles,
          'border-b border-eerie-black-600 justify-between pb-1',
        )}
      >
        <h1>{title}</h1>
        <button
          type="button"
          onClick={() => {
            notificationsStore.removeNotification(id)
          }}
          className="h-6"
        >
          <IoClose className="size-6" />
        </button>
      </div>
      {(icon || message) && (
        <div className={cx(containerStyles, 'pt-1')}>
          {icon && icon}
          {message && <p>{message}</p>}
        </div>
      )}
    </motion.div>
  )
}

// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let notifications = [
  {
    id: '1',
    ele: NotificationComponent({
      id: '1',
      title: 'Todo #1',
      icon: '🐨',
      message: 'testing',
    }),
  },
]
let listeners: Array<() => unknown> = []

const MAX_STACK = 5

export const notificationsStore = {
  addNotification({
    id,
    title,
    icon = '🐨',
    message = 'testing',
  }: Record<'title' | 'icon' | 'message' | 'id', string>) {
    console.log(id)
    notifications = [
      ...notifications,
      {
        id,
        ele: NotificationComponent({
          id,
          title: (title ?? 'Notify') + ` #${id}`,
          icon,
          message,
        }),
      },
    ].slice(-MAX_STACK)

    emitChange()
  },
  removeNotification(id: string) {
    notifications = notifications.filter(el => el.id !== id)

    emitChange()
  },
  subscribe(listener: (typeof listeners)[0]) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return notifications
  },
  getServerSnapshot() {
    return notifications
  },
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}
