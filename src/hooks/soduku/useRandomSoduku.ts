import {fetchSoduku} from '@/utils/soduku'
import {useQuery} from '@tanstack/react-query'

import type {SodukuDifficulties, SodukuPromiseReturn} from '@/types/soduku'

function useRandomSoduku({difficulty}: {difficulty?: SodukuDifficulties}) {
  return useQuery<SodukuPromiseReturn>({
    queryFn: () => fetchSoduku(difficulty),
    queryKey: ['soduku', difficulty],
    // ? We only want to refetch on mount and on new game
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    subscribed: true,
  })
}

export {useRandomSoduku}
