import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository'
import { CreateSpecificationController } from './CreateSpecificationController'
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase copy'

const specificationRepository = SpecificationRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
)
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }
