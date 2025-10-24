'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from 'react'

import {useRandomSoduku} from '@/hooks/soduku/useRandomSoduku'
import {useSubmitSoduku} from '@/hooks/soduku/useSubmitSoduku'
import type {SodukuDifficulties, SodukuState} from '@/types/soduku'
import {validateSodukuLines} from '@/utils/soduku'
import sodukuReducer, {
  initialSodukuReducerState,
  type TypeAndPayload,
} from './sodukuReducer'


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
  difficulty,
  children,
}: {
  difficulty?: SodukuDifficulties | 'random'
  children: ReactNode
}) {
  const [state, unsafeDispatch] = useReducer(
    sodukuReducer,
    initialSodukuReducerState,
  )
  const {data, isLoading, refetch, isRefetching} = useRandomSoduku({
    difficulty: difficulty === 'random' ? undefined : difficulty,
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

  const startGame = useEffectEvent(() => {
    if (!data) return

    dispatch({type: 'start', payload: {data, mutate}})
  })
  useEffect(() => {
    startGame()
  }, [data])

  const onStart: ContextType['0']['onStart'] = () => {
    refetch({cancelRefetch: false})
  }

  const dispatch = useCallback(unsafeDispatch, [unsafeDispatch])
  const value = [
    {...state, onStart, isPending, isLoading: isLoading || isRefetching},
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
