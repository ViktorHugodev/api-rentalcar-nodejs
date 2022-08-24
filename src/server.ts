import express from 'express'
import swaggerUi from 'swagger-ui-express'

import { createConnection } from './database/data-source'
import { router } from './routes'
import swaggerConfig from './swagger.json'

const app = express()
app.use(express.json())
createConnection()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.use(router)
app.listen(3333, () => console.log('Running on port 3333 on docker compose'))
