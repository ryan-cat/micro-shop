export interface IEvent {
  topic: string;
  data: any;
}

export type IEventHandler<E extends IEvent, M = any> = (data: E['data'], message: M) => void;

export abstract class EventBus<TClient = any, TMessage = any> {
  protected queueName: string;
  protected client: TClient;

  constructor(client: TClient, queueName: string) {
    this.client = client;
    this.queueName = queueName;
  }

  abstract publish<E extends IEvent>(event: E): void;
  abstract subscribe<E extends IEvent>(topic: E['topic'], handler: IEventHandler<E, TMessage>): void;
  abstract close(): void;
}
