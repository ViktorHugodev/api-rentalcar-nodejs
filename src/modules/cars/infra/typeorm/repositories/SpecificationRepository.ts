import { In, Repository } from 'typeorm'

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import AppDataSource from '@shared/infra/database/data-source'

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from './ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({
      id: In(ids),
    })
    return specifications
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
    return specification
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name })
    return specification
  }
  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find()
    return specifications
  }
}

export { SpecificationRepository }
