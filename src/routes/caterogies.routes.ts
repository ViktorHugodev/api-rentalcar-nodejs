import { Router } from 'express'

import { CategoryRepository } from '../repositories/CategoryRepository'

const categoriesRoutes = Router()
const categoryRepository = new CategoryRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  const categoryAlreadyExists = categoryRepository.findByName(name)
  if (categoryAlreadyExists) {
    return response.status(400).json({ message: 'Category already exists' })
  }
  categoryRepository.create({ name, description })

  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const list = categoryRepository.list()
  return response.status(200).json({ list })
})
export { categoriesRoutes }
