import { User, UserDocument } from '../models/user-models';
import { EventBus } from '@micro-shop/common';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserCreatedEvent, EventBusTopics } from '@micro-shop/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AccountSubscriptions implements OnApplicationBootstrap {
  constructor(private bus: EventBus, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  onApplicationBootstrap() {
    this.bus.subscribe(EventBusTopics.UserCreated, (data, msg) => this.handleUserCreated(this.userModel, data, msg));
  }

  public async handleUserCreated(userModel: Model<UserDocument>, data: UserCreatedEvent['data'], message) {
    await userModel.create({
      _id: data.id,
      name: data.name,
      email: data.email,
      updatedAt: data.updatedAt
    });
    message.ack();
  }
}
