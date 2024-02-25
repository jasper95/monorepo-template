import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@water-system-v2/trpc'

export const trpc = createTRPCReact<AppRouter>()
