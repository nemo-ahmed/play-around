'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 60 * 1000,
      retry: 1,
    },
  },
})
function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  )
}

export default AppLayout
