import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import 'reflect-metadata'

import 'express-async-errors'

import '@shared/container'

import { AppErrors } from '@errors/AppError'
import { createConnection } from '@shared/infra/database/data-source'
import { router } from '@shared/infra/http/routes'

import swaggerConfig from './swagger.json'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
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
createConnection()
  .then(() => console.log('Connection establisheddock'))
  .catch((error) => console.log('Error during initialize', error))

app.listen(3333, () => console.log('Running on port 3333......'))
