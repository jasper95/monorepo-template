import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { auth } from './routers'
import { createContext, router } from './trpc'
export { authMiddleware } from './auth/middleware'
export * from './types'

export const appRouter = router({
  auth,
})
export type AppRouter = typeof appRouter
export const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
})
