import dayjs from 'dayjs'

import { AppErrors } from '@errors/AppError'

import { RentalRepositoryInMemory } from '../infra/typeorm/repositories/in-memory/RentalRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalRepository: RentalRepositoryInMemory
describe('Create a rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepository)
  })
  it('Should be able to create a new rental car', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '43210',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    })
    console.log('rental', rental)
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('Should be able to create a new rental car', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '43210',
      user_id: '12345',
      expected_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental car if there is another open to same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '43210',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      })
      await createRentalUseCase.execute({
        car_id: '43210',
        user_id: '12345',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })

  it('Should not be able to create a new rental car if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '43210',
        user_id: '321',
        expected_return_date: dayAdd24Hours,
      })
      await createRentalUseCase.execute({
        car_id: '43210',
        user_id: '123',
        expected_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
  it('Should not be able to create a new rental with an invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '43210',
        user_id: '123',
        expected_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
