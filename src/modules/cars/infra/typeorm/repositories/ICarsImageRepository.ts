import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

interface ICarsImageRepository {
  create(car_image: string, car_id: string): Promise<CarImage>
}

export { ICarsImageRepository }
