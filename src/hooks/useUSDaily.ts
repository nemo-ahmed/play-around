import genericFetch from '@/api/fetch'
import {COVID_URL} from '@/api/urls'
import {useQuery} from '@tanstack/react-query'

import {USDailyType} from '@/types/usDaily'

function useUSDaily() {
  return useQuery<USDailyType>({
    queryFn: () => genericFetch({url: `${COVID_URL}/us/daily.json`}),
    queryKey: ['US', 'Daily'],
  })
}

export default useUSDaily
