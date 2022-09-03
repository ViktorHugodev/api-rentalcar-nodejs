import { CarsRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/in-memory/CarsRepositoryInMemory'

import { ListCarsUseCase } from './ListCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listCarsUseCase: ListCarsUseCase
describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })
  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3',
      description: 'Audi sedan',
      daily_rate: 120,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Audi',
      category_id: 'category_id',
    })
    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A3_test',
      description: 'Audi sedan',
      daily_rate: 120,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Audi',
      category_id: 'category_id',
    })
    const cars = await listCarsUseCase.execute({
      name: 'Audi A3_test',
    })
    console.log(car)
    expect(cars).toEqual([car])
  })
})
