import 'reflect-metadata'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'

import 'express-async-errors'

import '@shared/container'

import upload from '@config/upload'
import { AppErrors } from '@errors/AppError'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { createConnection } from '@shared/infra/database/data-source'
import { rateLimiterMiddleware } from '@shared/infra/http/middleware/rateLimiterRedis'
import { router } from '@shared/infra/http/routes'

import swaggerConfig from './swagger.json'

dotenv.config()

const app = express()

app.use(rateLimiterMiddleware)

Sentry.init({
  dsn: process.env.SENTRY_KEY,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())


app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))

app.use(cors())
app.use(router)
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppErrors) {
      return response.status(error.statusCode).json({ message: error.message })
    }
    return response.status(500).json({
      status: 'error',
      message: `Internal server error: ${error.message}`,
    })
  }
)
app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (
        error.status === 404 ||
        error.status === 500 ||
        error.status === 429
      ) {
        return true
      }
      return false
    },
  })
)

createConnection()
  .then(() => console.log('Connection establisheddock'))
  .catch((error) => console.log('Error during initialize', error))

app.listen(3333, () => console.log('Running on port 3333......'))
