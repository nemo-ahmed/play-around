'use client'
import {NotificationProvider} from '@/context'
import SpeakyProvider from '@/context/Speaky'
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
      <NotificationProvider>
        <SpeakyProvider>{children}</SpeakyProvider>
      </NotificationProvider>
    </QueryClientProvider>
  )
}

export default AppLayout
