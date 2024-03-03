import { cssVariablesResolver, theme } from '@/constants/theme'
import { createQueryClient, createTrpcClient, trpc } from '@/utils/trpc'
import { MantineProvider } from '@mantine/core'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export default function RootProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(createQueryClient)
  const [trpcClient] = useState(createTrpcClient)
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      cssVariablesResolver={cssVariablesResolver}
      withCssVariables
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </MantineProvider>
  )
}
