import { container } from 'tsyringe'

import { IUsersRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersRepository'
import { IUsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/IUsersTokenRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository'
import { CarImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoryRepository } from '@modules/cars/infra/typeorm/repositories/CategoryRepository'
import { ICarsImageRepository } from '@modules/cars/infra/typeorm/repositories/ICarsImageRepository'
import { ICarsRepository } from '@modules/cars/infra/typeorm/repositories/ICarsRepository'
import { ICaterogyRepository } from '@modules/cars/infra/typeorm/repositories/ICategoryRepository'
import { ISpecificationRepository } from '@modules/cars/infra/typeorm/repositories/ISpecificationRepository'
import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { IRentalRepository } from '@modules/rentals/infra/typeorm/repositories/IRentalRepository'
import { RentalRepository } from '@modules/rentals/infra/typeorm/repositories/RentalRepository'
import { IDateProvider } from '@shared/container/DateProvider/IDateProvider'

import { DateProvider } from './DateProvider/implementations/DayJsDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { SESMailProvider } from './MailProvider/implementations/SESMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

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

container.registerSingleton<IRentalRepository>(
  'RentalRepository',
  RentalRepository
)
container.registerSingleton<IUsersTokenRepository>(
  'UsersTokenRepository',
  UsersTokenRepository
)

container.registerSingleton<IDateProvider>('DateProvider', DateProvider)
const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'S3StorageProvider',
  diskStorage[process.env.disk]
)

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)
