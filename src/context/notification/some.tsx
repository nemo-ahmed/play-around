'use client'
import {cx} from '@/other/exports'
import React, {createRef} from 'react'
import {IoClose} from 'react-icons/io5'

export const NotificationComponent = ({
  title,
  message,
  icon,
}: {
  title: string
  message: string
  icon: string
}) => {
  const ref = createRef<HTMLDivElement>()
  const containerStyles =
    'flex gap-2 items-center px-3 py-2.5 text-eerie-black-400 dark:text-eerie-black-800'

  return (
    <div
      ref={ref}
      className="w-3xs bg-eerie-black-900 dark:bg-eerie-black-300 rounded-md shadow shadow-eerie-black"
    >
      <div
        className={cx(
          'border-b border-eerie-black-600 justify-between',
          containerStyles,
        )}
      >
        <h1>{title}</h1>
        <button
          type="button"
          onClick={() => {
            ref.current?.remove()
          }}
          className="h-6"
        >
          <IoClose className="size-6" />
        </button>
      </div>
      {(icon || message) && (
        <div className={containerStyles}>
          {icon && icon}
          {message && <p>{message}</p>}
        </div>
      )}
    </div>
  )
}

// This is an example of a third-party store
// that you might need to integrate with React.

// If your app is fully built with React,
// we recommend using React state instead.

let nextId = 0
let todos = [
  {
    id: nextId++,
    ele: NotificationComponent({
      title: 'Todo #' + nextId,
      icon: '🐨',
      message: 'testing',
    }),
  },
]
let listeners: Array<() => unknown> = []

export const todosStore = {
  addTodo({
    title = 'Todo #' + todos.length,
    icon = '🐨',
    message = 'testing',
  }: Record<'title' | 'icon' | 'message', string>) {
    nextId++
    todos = [
      ...todos,
      {
        id: nextId,
        ele: NotificationComponent({
          title,
          icon,
          message,
        }),
      },
    ]

    emitChange()
  },
  subscribe(listener: (typeof listeners)[0]) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getSnapshot() {
    return todos
  },
  getServerSnapshot() {
    return todos
  },
}

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}
