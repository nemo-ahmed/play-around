'use client'
import {cx} from '@/other/exports'
import {motion} from 'motion/react'
import React, {JSX} from 'react'
import {IoClose} from 'react-icons/io5'

export interface Props {
  title: string
  id: string
  message?: string
  icon?: string
}

export const NotificationComponent = ({title, message, icon, id}: Props) => {
  const containerStyles = cx(
    'flex gap-2 items-center text-eerie-black-400 dark:text-eerie-black-800',
    {
      'pl-3 pr-1 py-2.5': message || icon,
      'px-3 py-2.5': !message && !icon,
    },
  )

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
    >
      <div
        className={cx(containerStyles, 'justify-between', {
          'border-b border-eerie-black-600 pb-1': message || icon,
        })}
      >
        <h1 className="capitalize text-xl">{title}</h1>
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

let notifications: {
  id: string
  ele: JSX.Element
}[] = []
let listeners: Array<() => unknown> = []

const MAX_STACK = 5

export const notificationsStore = {
  addNotification({id, title, icon, message}: Props) {
    console.log(id)
    notifications = [
      ...notifications,
      {
        id,
        ele: NotificationComponent({
          id,
          title,
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
