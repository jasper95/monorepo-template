import { serve } from '@hono/node-server'
import { honoMiddleware } from '@water-system-v2/trpc'
import { Hono } from 'hono'

const app = new Hono()
app.use('/trpc/*', honoMiddleware)

serve({
  fetch: app.fetch,
  port: 4000,
})
