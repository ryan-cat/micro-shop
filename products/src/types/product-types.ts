import { ListDto } from '@micro-shop/common';
import { Product } from './../models/product-models';
export interface CreateProductDto {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export type ProductListDto = ListDto<Product>;
export type ProductSort = 'name' | 'price' | 'createdAt';
