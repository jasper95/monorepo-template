import { TRPCError, initTRPC } from '@trpc/server'
import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { db } from '@water-system-v2/database'
import superjson from 'superjson'
import { ZodError } from 'zod'
// import { lucia } from './auth/lucia'

const transformer = superjson
export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    db,
  }
}

export type Context = ReturnType<typeof createContext>
const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter(opts) {
    const { shape, error } = opts
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})
export const protectedProcedure = t.procedure.use(
  async function isAuthed(opts) {
    const { ctx } = opts
    if (!ctx.res.locals.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next({})
  },
)
export const publicProcedure = t.procedure
export const router = t.router
