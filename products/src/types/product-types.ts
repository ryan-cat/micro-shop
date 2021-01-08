import { BaseDto } from 'src/utils/base-dto';

export class ProductDto extends BaseDto {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
