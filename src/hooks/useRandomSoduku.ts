import {SodukuPromiseReturn} from '@/types/soduku'
import {fetchSoduku} from '@/utils/soduku/fetchSoduku'
import {useQuery} from '@tanstack/react-query'

function useRandomSoduku({rating}: {rating?: string}) {
  return useQuery<SodukuPromiseReturn>({
    queryFn: () => fetchSoduku(rating),
    queryKey: ['soduku', rating],
    // ? We only want to refetch on mount and on new game
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
}

export default useRandomSoduku
