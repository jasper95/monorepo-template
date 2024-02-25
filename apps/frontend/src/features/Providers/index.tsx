import { PropsWithChildren, useState } from 'react'

import { theme } from '@/constants/theme'
import { trpc } from '@/utils/trpc'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink, httpLink } from '@trpc/react-query'
import superjson from 'superjson'

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: false,
//     },
//   },
// })
// const trpcClient = trpc.createClient({
//   links: [
//     httpBatchLink({
//       transformer: superjson,
//       url: '/api/trpc',
//     }),
//   ],
// })
export default function RootProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          transformer: superjson,
          url: '/api/trpc',
        }),
      ],
    }),
  )
  return (
    <MantineProvider theme={theme} defaultColorScheme="light" withCssVariables>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools position="bottom" />
        </QueryClientProvider>
      </trpc.Provider>
    </MantineProvider>
  )
}
