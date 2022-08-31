import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ICaterogyRepository } from '@modules/cars/infra/typeorm/repositories/ICategoryRepository'
import { ISpecificationRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'

container.registerSingleton<ICaterogyRepository>(
  'CategoryRepository',
  CategoryRepository
)

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
