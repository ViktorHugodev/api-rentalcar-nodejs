import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create(image_name: string, car_id: string): Promise<CarImage>
}

export { ICarsImageRepository }
