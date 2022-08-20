import { Router } from 'express'

import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService'

const specificationRoutes = Router()
const specificationRepository = new SpecificationRepository()
specificationRoutes.get('/', (request, response) => {
  const specificationsList = specificationRepository.list()
  return response.status(200).json({ specificationsList })
})

specificationRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  const specification = new CreateSpecificationService(specificationRepository)
  specification.execute({ name, description })

  return response.status(201).json({ message: 'Specification created' })
})

export { specificationRoutes }
