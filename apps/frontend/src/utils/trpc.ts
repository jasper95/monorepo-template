import { QueryClient } from '@tanstack/react-query'
import {
  TRPCClientErrorLike,
  createTRPCReact,
  httpBatchLink,
  httpLink,
  loggerLink,
  splitLink,
} from '@trpc/react-query'
import type { AppRouter } from '@water-system-v2/trpc'
import superjson from 'superjson'

type Maybe<T> = T | null | undefined

const url = '/trpc'
export const trpc = createTRPCReact<AppRouter>()
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        /**
         * 1s should be enough to just keep identical query waterfalls low
         * @example if one page components uses a query that is also used further down the tree
         */
        staleTime: 1000,
        /**
         * Retry `useQuery()` calls depending on this function
         */
        retry(failureCount, _err) {
          const err = _err as never as Maybe<TRPCClientErrorLike<AppRouter>>
          const code = err?.data?.code
          if (
            code === 'BAD_REQUEST' ||
            code === 'FORBIDDEN' ||
            code === 'UNAUTHORIZED'
          ) {
            // if input data is wrong or you're not authorized there's no point retrying a query
            return false
          }
          const MAX_QUERY_RETRIES = 3
          return failureCount < MAX_QUERY_RETRIES
        },
      },
    },
  })
export const createTrpcClient = () =>
  trpc.createClient({
    links: [
      loggerLink({
        enabled: (opts) =>
          (process.env.NODE_ENV === 'development' &&
            typeof window !== 'undefined') ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      splitLink({
        condition(op) {
          // check for context property `skipBatch`
          return op.context.skipBatch === true
        },
        // when condition is true, use normal request
        true: httpLink({
          transformer: superjson,
          url,
        }),
        false: httpBatchLink({
          transformer: superjson,
          url,
        }),
      }),
    ],
  })
