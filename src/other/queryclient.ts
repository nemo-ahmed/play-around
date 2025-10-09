import {QueryClient} from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ? 10 mins
      staleTime: 10_60_1000,
      retry: 1,
    },
  },
})
