import { EventBusTopics } from './index';
import { IEvent } from '../event-bus';

export interface UserCreatedEvent extends IEvent {
  topic: EventBusTopics.UserCreated;
  data: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
