'use client'
import SpeakyProvider from '@/context/Speaky'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // ? 10 mins
      staleTime: 10_60_1000,
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
      <SpeakyProvider>{children}</SpeakyProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
