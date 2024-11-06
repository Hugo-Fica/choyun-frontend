'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '../ui/toaster'

const queryClient = new QueryClient()
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  )
}
