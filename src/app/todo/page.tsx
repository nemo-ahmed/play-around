'use client'
import {todosStore} from '@/utils/notification'
import React, {useCallback, useMemo, useSyncExternalStore} from 'react'
import {createPortal} from 'react-dom'

function Page() {
  const server = useCallback(() => {
    return []
  }, [])
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
    server,
  )
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
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
    </>
  )
}

export default Page
