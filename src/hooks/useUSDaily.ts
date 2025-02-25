import genericFetch from '@/api/fetch'
import {COVID_URL} from '@/api/urls'
import {useQuery} from '@tanstack/react-query'

function useUSDaily() {
  return useQuery({
    queryFn: () => genericFetch({url: `${COVID_URL}/us/daily.json`}),
    queryKey: ['US', 'Daily'],
  })
}

export default useUSDaily
