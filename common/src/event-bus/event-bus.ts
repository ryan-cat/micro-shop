export interface IEvent {
  topic: string;
  data: any;
}

export type IEventHandler<E extends IEvent, M = any> = (data: E['data'], message: M) => void;

export abstract class EventBus<TClient = any, TMessage = any, TOptions = any> {
  protected queueName: string;
  protected client: TClient;
  protected options: TOptions;

  constructor(client: TClient, queueName: string, options?: TOptions) {
    this.client = client;
    this.queueName = queueName;
    this.options = options;
  }

  abstract publish<E extends IEvent>(event: E): void;
  abstract subscribe<E extends IEvent>(topic: E['topic'], handler: IEventHandler<E, TMessage>, options?: TOptions): void;
  abstract close(): void;
}
