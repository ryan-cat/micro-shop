import { ProductDocument } from './../models/product-models';

export interface CheckoutDto {
  productIds: string[];
  billingState: string;
}

interface CheckoutPricing {
  subtotal: number;
  estimatedTax: number;
  total: number;
}

export interface CheckoutSession extends CheckoutPricing {
  products: {
    id: string;
    price: number;
  }[];
  billingState: string;
}

export interface CheckoutDetails extends CheckoutPricing {
  id: string;
  products: ProductDocument[];
}
