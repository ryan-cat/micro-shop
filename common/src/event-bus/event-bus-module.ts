import { NatsEventBus } from './nats-event-bus';
import { EventBus, IEventHandler } from './event-bus';
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as nats from 'node-nats-streaming';

interface NATSOptions {
  queueName: string;
  clientId?: string;
  clusterId?: string;
}

function setupNATS(options: EventBusModuleOptions, onConnect: (bus: EventBus) => void): EventBus {
  const stan = nats.connect(options.transportOptions.clusterId || 'micro-shop', options.transportOptions.clientId || randomBytes(4).toString('hex'), {
    url: options?.url
  });
  const bus = new NatsEventBus(stan, options.transportOptions.queueName);

  stan.on('connect', () => {
    onConnect(bus);
  });

  return bus;
}

function addSubscriptions(bus: EventBus, subs: EventBusModuleSubscription[]) {
  if (!subs) {
    return;
  }

  subs.forEach((val) => {
    bus.subscribe(val.topic, val.handler);
  });
}

export interface EventBusModuleSubscription<M = any> {
  topic: string;
  handler: IEventHandler<any, M>;
}

export interface EventBusModuleOptions {
  url: string;
  subscriptions?: EventBusModuleSubscription[];
  transportOptions: NATSOptions;
}

@Global()
@Module({})
export class EventBusModule {
  static register(options: EventBusModuleOptions): DynamicModule {
    const bus = setupNATS(options, (bus) => addSubscriptions(bus, options.subscriptions));

    const provider: Provider = {
      provide: EventBus,
      useValue: bus
    };

    return {
      module: EventBusModule,
      providers: [provider],
      exports: [provider]
    };
  }
}