import { EventBusTopics } from './topics';
import { IEvent } from '../event-bus/event-bus';

export interface ProductCreatedEvent extends IEvent {
  topic: EventBusTopics.ProductCreated;
  data: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    seller: {
      id: string;
      name: string;
      updatedAt: string;
    };
  };
}
