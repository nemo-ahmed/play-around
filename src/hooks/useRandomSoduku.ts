import {SodukuPromiseReturn} from '@/types/soduku'
import {fetchSoduku} from '@/utils/soduku/fetchSoduku'
import {useQuery} from '@tanstack/react-query'

function useRandomSoduku({rating}: {rating?: string}) {
  return useQuery<SodukuPromiseReturn>({
    queryFn: ({queryKey}) => fetchSoduku(queryKey[1] as typeof rating),
    queryKey: ['soduku', rating],
  })
}

export default useRandomSoduku
