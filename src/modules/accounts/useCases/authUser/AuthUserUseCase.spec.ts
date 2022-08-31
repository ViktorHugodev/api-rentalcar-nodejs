import { AppErrors } from '@errors/AppError'
import { UsersRepositoryInMemory } from '@modules/accounts/infra/typeorm/repositories/in-memory/UsersRepository'

import { IUserCreateDTO } from '../../dtos/ICreateUserDTO'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { AuthUserUseCase } from './AuthUserUseCase'

let authUserUseCase: AuthUserUseCase
let userRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
describe('Authenticate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory()
    authUserUseCase = new AuthUserUseCase(userRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  })

  it('Should be able to authenticate user', async () => {
    const user: IUserCreateDTO = {
      email: 'user@example.com',
      driver_license: '002166',
      name: 'Victor',
      password: '1234',
    }
    await createUserUseCase.execute(user)
    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    })
    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate a nonexistent user', async () => {
    expect(async () => {
      await authUserUseCase.execute({
        email: 'oi@teste.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })

  it('Should not be able to authenticate a user with a wrong password', () => {
    expect(async () => {
      const user: IUserCreateDTO = {
        email: 'user@example.com',
        driver_license: '99123',
        name: 'Mateus',
        password: '987654',
      }
      await createUserUseCase.execute(user)
      await authUserUseCase.execute({
        email: user.email,
        password: 'user.password',
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
