import { AppErrors } from '@errors/AppError'
import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/in-memory/SpecificationRepositoryInMemory'

import { CreateCarSpeficiationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpeficiationUseCase: CreateCarSpeficiationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory
describe('Create car specification', () => {
  beforeEach(() => {
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarSpeficiationUseCase = new CreateCarSpeficiationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    )
  })

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Fusca test',
      brand: 'Fiat test',
      description: 'A car for my tests',
      category_id: 'test-car',
      license_plate: 'ABC-1234',
      daily_rate: 100,
      fine_amount: 60,
    })
    const specification_id = ['54321']
    await createCarSpeficiationUseCase.execute({
      car_id: car.id,
      specification_id,
    })
  })

})
