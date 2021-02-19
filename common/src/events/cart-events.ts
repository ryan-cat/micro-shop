import { EventBusTopics } from '../events';

export interface CartItemAddedEvent {
  topic: EventBusTopics.CartItemAdded;
  data: {
    id: string;
    product: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
      updatedAt: Date;
    };
    userId: string;
    createdAt: Date;
  };
}

export interface CartItemRemoveEvent {
  topic: EventBusTopics.CartItemRemoved;
  data: {
    id: string;
  };
}
