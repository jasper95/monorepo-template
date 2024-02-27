import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers'
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { Session, User } from "lucia"
import { lucia } from "./auth/lucia"
import { db } from "@water-system-v2/database"

export type Context = Awaited<ReturnType<typeof createContext>>
export const createContext = async({ req, res }: CreateExpressContextOptions) => {
  let user: User
  let session: Session
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '')
  if(sessionId) {
    ;({ user, session } = await lucia.validateSession(sessionId))
    if (session?.fresh) {
      res.appendHeader(
        'Set-Cookie',
        lucia.createSessionCookie(session.id).serialize(),
      )
    }
    if (!session) {
      res.appendHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    }
  }
  return {
    req,
    res,
    db,
    user,
    session
  }
}

export const trpcMiddleware = createExpressMiddleware({
  router: appRouter,
  createContext,
})
