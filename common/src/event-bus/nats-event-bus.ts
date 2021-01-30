import { Message, Stan } from 'node-nats-streaming';
import { EventBus, IEvent, IEventHandler } from './event-bus';

export class NatsEventBus extends EventBus<Stan, Message> {
  private ackWait = 5 * 1000;

  constructor(client: Stan, queueName: string) {
    super(client, queueName);
  }

  publish<E extends IEvent>(event: E) {
    this.client.publish(event.topic, JSON.stringify(event.data));
  }

  subscribe<E extends IEvent>(topic: E['topic'], handler: IEventHandler<E, Message>) {
    const subscription = this.client.subscribe(topic, this.queueName, this.subscriptionOptions());

    subscription.on('message', (msg: Message) => {
      const parsedData = this.parseIncomingMessage(msg);
      handler(parsedData, msg);
    });
  }

  private parseIncomingMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'));
  }

  private subscriptionOptions() {
    return this.client.subscriptionOptions().setManualAckMode(true).setStartWithLastReceived().setAckWait(this.ackWait).setDurableName(this.queueName);
  }

  gracefulShutdown() {
    process.on('SIGINT', () => this.client.close());
    process.on('SIGTERM', () => this.client.close());
  }
}
