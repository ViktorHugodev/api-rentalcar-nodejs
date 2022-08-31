import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/in-memory/CarsRepositoryInMemory'

import { CreateCarUseCase } from './CreateCarUseCase'

let carRepository: CarsRepositoryInMemory
let createCarUseCase: CreateCarUseCase
describe('Create a car', () => {
  beforeEach(() => {
    carRepository = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carRepository)
  })

  it('Should be able to create a  new car', async () => {
    await createCarUseCase.execute({
      name: 'Fusca test',
      brand: 'Fiat test',
      description: 'A car for my tests',
      category_id: 'test-car',
      license_plate: 'ABC-1234',
      daily_rate: 100,
      fine_amount: 60,
    })
  })
})
