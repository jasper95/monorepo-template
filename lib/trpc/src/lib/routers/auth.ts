import { TRPCError } from '@trpc/server'
import {
  db,
  emailVerificationCodeTable,
  userTable,
} from '@water-system-v2/database'
import * as mailer from '@water-system-v2/mailer'
import { eq } from 'drizzle-orm'
import { generateId } from 'lucia'
import { TimeSpan, createDate } from 'oslo'
import { alphabet, generateRandomString } from 'oslo/crypto'
import { Argon2id } from 'oslo/password'
import { z } from 'zod'
import { lucia } from '../auth/lucia'
import { protectedProcedure, publicProcedure, router } from '../trpc'

export const auth = router({
  session: protectedProcedure.query(({ ctx }) => {
    const { user, session} = ctx
    return {
      session,
      user,
    }
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const { res, session } = ctx
    await lucia.invalidateSession(session.id)
    res.setHeader('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    return {
      success: true,
    }
  }),
  login: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/auth/login' } })
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .output(
      z.object({
        success: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input
      const error = new TRPCError({
        message: 'Invalid email or password',
        code: 'BAD_REQUEST',
      })
      const user = await ctx.db.query.userTable.findFirst({
        where: (table, { eq }) => eq(table.email, email),
        columns: {
          id: true,
          hashedPassword: true,
        },
      })
      if (!user) {
        throw error
      }
      const validPassword = await new Argon2id().verify(
        user.hashedPassword,
        password,
      )
      if (!validPassword) {
        throw error
      }
      const session = await lucia.createSession(`${user.id}`, {})
      const sessionCookie = lucia.createSessionCookie(session.id)
      ctx.res.appendHeader('Set-Cookie', sessionCookie.serialize())
      return {
        success: true,
      }
    }),
  // make me a signup procedure
  signup: publicProcedure
    .meta({ openapi: { method: 'POST', path: '/signup' } })
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input
      const hashedPassword = await new Argon2id().hash(password)
      const userId = generateId(21)
      await ctx.db
        .insert(userTable)
        .values({
          id: userId,
          email,
          hashedPassword,
        })
        .execute()

      const verificationCode = await generateEmailVerificationCode(
        userId,
        email,
      )
      const body = mailer.renderVerificationCodeEmail({
        code: verificationCode,
      })
      await mailer.sendMail({
        to: email,
        subject: 'Verify your account',
        body,
      })
      return {
        success: true,
      }
    }),
})

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(emailVerificationCodeTable)
    .where(eq(emailVerificationCodeTable.userId, userId))
  const code = generateRandomString(8, alphabet('0-9')) // 8 digit code
  await db.insert(emailVerificationCodeTable).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, 'm')), // 10 minutes
  })
  return code
}
