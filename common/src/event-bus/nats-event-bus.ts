import { Message, Stan, SubscriptionOptions } from 'node-nats-streaming';
import { EventBus, IEvent, IEventHandler } from './event-bus';

export class NatsEventBus extends EventBus<Stan, Message, SubscriptionOptions> {
  private ackWait = 5 * 1000;

  constructor(client: Stan, queueName: string, options?: SubscriptionOptions) {
    super(client, queueName, options);

    if (!this.options) {
      this.options = this.client.subscriptionOptions().setManualAckMode(true).setDeliverAllAvailable().setAckWait(this.ackWait).setDurableName(this.queueName);
    }
  }

  publish<E extends IEvent>(event: E) {
    this.client.publish(event.topic, JSON.stringify(event.data));
  }

  subscribe<E extends IEvent>(topic: E['topic'], handler: IEventHandler<E, Message>, options?: SubscriptionOptions) {
    const subscription = this.client.subscribe(topic, this.queueName, options || this.options);

    subscription.on('message', (msg: Message) => {
      const parsedData = this.parseIncomingMessage(msg);
      handler(parsedData, msg);
    });
  }

  close() {
    this.client.close();
  }

  private parseIncomingMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }
}
