export interface ProductSeller {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  dsecription: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  seller: ProductSeller;
}
