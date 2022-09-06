import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { CarImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ICarsImageRepository } from '@modules/cars/infra/typeorm/repositories/ICarsImageRepository'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'
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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImageRepository>(
  'CarImageRepository',
  CarImageRepository
)
