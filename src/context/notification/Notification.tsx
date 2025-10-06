import React, {
  createContext,
  ReactNode,
  useContext,
  useSyncExternalStore,
} from 'react'
import {todosStore} from './some'
import {createPortal} from 'react-dom'

const Context = createContext({})
function NotificationProvider({children}: {children: ReactNode}) {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
    todosStore.getServerSnapshot,
  )
  return (
    <Context value={{todos}}>
      {children}
      {createPortal(
        <ul className="fixed bottom-0 right-0 z-[9999909999]">
          {todos.map(todo => (
            <li key={todo.id} className="m-4">
              {todo.ele}
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </Context>
  )
}

export const notify = (props: Record<'title' | 'icon' | 'message', string>) =>
  todosStore.addTodo(props)

export default NotificationProvider
