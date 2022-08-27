import { Repository } from 'typeorm'

import AppDataSource from '../../../../database/data-source'
import { Specification } from '../../entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository'

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = AppDataSource.getRepository(Specification)
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description })
    await this.repository.save(specification)
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
