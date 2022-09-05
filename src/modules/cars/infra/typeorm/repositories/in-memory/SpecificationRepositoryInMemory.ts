import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = []

  constructor() {
    this.specifications = []
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, { name, description })
    this.specifications.push(specification)
    return specification
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      (specification) => specification.name === name
    )
  }
  async list(): Promise<Specification[]> {
    return this.specifications
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    )
    return allSpecifications
  }
}

export { SpecificationRepositoryInMemory }
