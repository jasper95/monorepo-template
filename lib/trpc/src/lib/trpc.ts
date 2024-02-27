import { TRPCError, initTRPC } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import type { Context } from './express'

const transformer = superjson

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
    if (!ctx.session) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return opts.next({})
  },
)
export const publicProcedure = t.procedure
export const router = t.router
