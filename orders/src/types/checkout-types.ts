import { ProductDocument } from './../models/product-models';

export interface CheckoutDto {
  productIds: string[];
}

interface CheckoutPricing {
  subtotal: number;
  tax: number;
  total: number;
}

export interface CheckoutSession extends CheckoutPricing {
  products: {
    id: string;
    price: number;
  }[];
}

export interface CheckoutDetails extends CheckoutPricing {
  products: ProductDocument[];
}
