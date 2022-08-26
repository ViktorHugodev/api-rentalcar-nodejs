import { Category } from '../../entities/Category'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

// CreateService tem a única função, criar um serivço, nada mais
class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationRepository) {}
  execute(): Category[] {
    const specifications = this.specificationRepository.list()
    return specifications
  }
}

export { ListSpecificationUseCase }
