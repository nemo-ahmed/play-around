import {useQuery} from '@tanstack/react-query'

import {USDailyType} from '@/types/usDaily'
import genericFetch from '@/utils/fetch'
import {COVID_URL} from '@/utils/urls'


function useUSDaily() {
  return useQuery<USDailyType>({
    queryFn: () => genericFetch({url: `${COVID_URL}/us/daily.json`}),
    queryKey: ['US', 'Daily'],
  })
}

export default useUSDaily
