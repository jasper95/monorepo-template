import { Session, User } from 'lucia'
import { lucia } from './auth/lucia'

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: {
      email: string
    }
  }
}

