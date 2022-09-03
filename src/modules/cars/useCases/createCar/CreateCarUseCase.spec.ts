import { AppErrors } from '@errors/AppError'
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
    const car = await createCarUseCase.execute({
      name: 'Fusca test',
      brand: 'Fiat test',
      description: 'A car for my tests',
      category_id: 'test-car',
      license_plate: 'ABC-1234',
      daily_rate: 100,
      fine_amount: 60,
    })
    expect(car).toHaveProperty('id')
  })
  it('Should not be able to create a car with an exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        brand: 'Fiat test',
        description: 'A car for my tests',
        category_id: 'test-car',
        license_plate: 'ABC-1234',
        daily_rate: 100,
        fine_amount: 60,
      })

      await createCarUseCase.execute({
        name: 'Car2',
        brand: 'Fiat test',
        description: 'A car for my tests',
        category_id: 'test-car',
        license_plate: 'ABC-1234',
        daily_rate: 100,
        fine_amount: 60,
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })

  it('Should be able to create a car with avaible true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car avaible',
      brand: 'Fiat test',
      description: 'A car for my tests',
      category_id: 'test-car',
      license_plate: 'ABC-2234',
      daily_rate: 100,
      fine_amount: 60,
    })
    expect(car.avaible).toBe(true)
  })
})
