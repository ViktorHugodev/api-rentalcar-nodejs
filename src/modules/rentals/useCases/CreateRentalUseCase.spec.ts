import { RentalRepositoryInMemory } from '../infra/typeorm/repositories/in-memory/RentalRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalRepository: RentalRepositoryInMemory
describe('Create a rental', () => {
  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalRepository)
  })
  // it('Should be able to create a new rental car', async () => {
  //   await createRentalUseCase.execute({
  //     user_id: '1234',
  //     car_id: '4321',
  //     expected_return_date: new Date()
  //   })
  // })
})