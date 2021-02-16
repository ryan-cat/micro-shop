export interface CartItem {
  id: string;
  userId: string;
  product: {
    name: string;
    imageUrl: string;
    price: number;
    updatedAt: Date;
  };
  createdAt: Date;
}
