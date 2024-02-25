import { luciaAdapter } from '@water-system-v2/database'
import { Lucia } from 'lucia'

export const lucia = new Lucia(luciaAdapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    }
  },
})
