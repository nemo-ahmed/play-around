'use client'

import type {SodukuState} from '@/types/soduku'
import {
  type ActionDispatch,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import sodukuReducer, {
  initialSodukuReducerState,
  type TypeAndPayload,
} from './sodukuReducer'
import {validateSodukuLines} from '@/utils/soduku'

const Soduku = createContext<
  [SodukuState, Partial<ActionDispatch<[TypeAndPayload]>>]
>([initialSodukuReducerState, () => {}])

export default function SodukuProvider({children}: {children: ReactNode}) {
  const [state, unsafeDispatch] = useReducer(
    sodukuReducer,
    initialSodukuReducerState,
  )

  useEffect(() => {
    if (state.count < 81) return
    if (
      validateSodukuLines(state.colState) &&
      validateSodukuLines(state.gridState) &&
      validateSodukuLines(state.rowState)
    ) {
      state.submitSoduku({
        ...state.rawData.data[0],
        soduku: state.rowState.flat().join(''),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count])

  const dispatch = useCallback(unsafeDispatch, [unsafeDispatch])
  const value = [state, dispatch] as [
    SodukuState,
    Partial<ActionDispatch<[TypeAndPayload]>>,
  ]
  return <Soduku value={value}>{children}</Soduku>
}

export function useSoduku() {
  const context = useContext(Soduku)
  if (!context?.[0] || !context?.[1]) {
    throw new Error('useSoduku need to be used inside Soduku`s Provider')
  }
  return context as [SodukuState, ActionDispatch<[TypeAndPayload]>]
}
