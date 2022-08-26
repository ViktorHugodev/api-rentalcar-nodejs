import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { createConnection } from './database/data-source'
import { router } from './routes'
import './shared/container'
import swaggerConfig from './swagger.json'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.use(router)
createConnection()

app.listen(3333, () => console.log('Running on port 3333......'))
