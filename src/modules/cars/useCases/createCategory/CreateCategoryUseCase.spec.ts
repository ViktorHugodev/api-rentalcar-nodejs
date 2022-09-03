import { AppErrors } from '@errors/AppError'
import { CategoryRepositoryInMemory } from '@modules/cars/infra/typeorm/repositories/in-memory/CategoryRepositoryInMemory'

import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoryRepositoryInMemory

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    )
  })
  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category test description',
    }
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    )
    expect(categoryCreated).toHaveProperty('id')
  })
  it('Should not be able to create a new category with the same name', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category test description',
      }
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppErrors)
  })
})
