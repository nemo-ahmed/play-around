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
import useRandomSoduku from '@/hooks/soduku/useRandomSoduku'
import useSubmitSoduku from '@/hooks/soduku/useSubmitSoduku'

type ContextType = [
  SodukuState & {
    onStart: VoidFunction
    isPending?: boolean
    isLoading?: boolean
  },
  ActionDispatch<[TypeAndPayload]>,
]

const Soduku = createContext<ContextType>([
  {...initialSodukuReducerState, onStart: () => {}},
  () => {},
])

export default function SodukuProvider({
  rating,
  children,
}: {
  rating?: string
  children: ReactNode
}) {
  const [state, unsafeDispatch] = useReducer(
    sodukuReducer,
    initialSodukuReducerState,
  )

  const {data, refetch, isLoading} = useRandomSoduku({
    rating,
  })
  const {mutate, isPending} = useSubmitSoduku()

  useEffect(() => {
    if (state.count < 81) return
    if (
      validateSodukuLines(state.colState) &&
      validateSodukuLines(state.gridState) &&
      validateSodukuLines(state.rowState)
    ) {
      state.submitSoduku({
        ...state.rawData,
        puzzleBoard: state.rowState.flat().join(''),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.count])

  const onStart = () => {
    if (!data?.puzzleBoard) return
    dispatch({type: 'start', payload: {data, mutate}})
    refetch({cancelRefetch: false})
  }

  const dispatch = useCallback(unsafeDispatch, [unsafeDispatch])
  const value = [
    {...state, onStart, isPending, isLoading},
    dispatch,
  ] as ContextType
  return <Soduku value={value}>{children}</Soduku>
}

export function useSoduku() {
  const context = useContext(Soduku)
  if (!context?.[0] || !context?.[1]) {
    throw new Error('useSoduku need to be used inside Soduku`s Provider')
  }
  return context as ContextType
}
