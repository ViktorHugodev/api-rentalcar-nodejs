import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UploadCarImageUseCase } from './UploadCarImageUseCase'

interface IFile {
  filename: string
}
class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const images = request.files as IFile[]

    const images_name = images.map((file) => file.filename)

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase)
    const upload = await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    })
    return response.status(201).json(upload)
  }
}

export { UploadCarImageController }
