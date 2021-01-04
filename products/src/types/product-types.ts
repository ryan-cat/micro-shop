import { Product } from '../models/product-models';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseDto } from 'src/utils/base-dto';

@ObjectType('Product')
export class ProductDto extends BaseDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  imageUrl: string;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
