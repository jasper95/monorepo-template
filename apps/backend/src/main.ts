import { trpcMiddleware } from '@water-system-v2/trpc'
import express from 'express'

const app = express()

app.use('/api/trpc', trpcMiddleware)

app.listen(4000)
