import { trpcServer,  } from '@hono/trpc-server'
import { appRouter } from '../routers'
import { db } from "@water-system-v2/database"
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { Session, User } from 'lucia'
import { lucia } from '../auth/lucia'

const parseCookies = (cookies: string): Record<string,string> => {
  if(!cookies) return {}
  return cookies.split('; ').reduce((acc, cookie) => {
    const [key, value] = cookie.split('=')
    return {
      ...acc,
      [key]: value
    }
  }, {})
}

const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req, resHeaders } = opts
  let user: User
  let session: Session
  const sessionId = parseCookies(req.headers.get('cookie') ?? '')[lucia.sessionCookieName]
  if(sessionId) {
    if(sessionId) {
      ;({ user, session } = await lucia.validateSession(sessionId))
      if (session?.fresh) {
        resHeaders.append(
          'Set-Cookie',
          lucia.createSessionCookie(session.id).serialize(),
        )
      }
      if (!session) {
        resHeaders.append('Set-Cookie', lucia.createBlankSessionCookie().serialize())
      }
    }
  }
  return {
    req,
    db,
    resHeaders,
    user,
    session
  }
}
export type Context = Awaited<ReturnType<typeof createContext>>
export const honoMiddleware = trpcServer({
  router: appRouter,
  createContext,
})