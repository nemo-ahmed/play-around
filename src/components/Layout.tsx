'use client'
import {NotificationProvider} from '@/context'
import {queryClient} from '@/other/queryclient'
import {QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import React from 'react'

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <NotificationProvider>{children}</NotificationProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
