import { List } from './general-types';

export interface ProductSeller {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  seller: ProductSeller;
}

export type ProductList = List<Product>;
