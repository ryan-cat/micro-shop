import { registerAs } from '@nestjs/config';
export interface ApiGatewayConfiguration {
  prefix?: string;
  services: ServiceConfiguration[];
}

export interface ServiceConfiguration {
  name: string;
  paths: string[];
  url: string;
}

export default registerAs(
  'gateway',
  (): ApiGatewayConfiguration => ({
    prefix: '/api',
    services: [
      { name: 'products', paths: ['/products'], url: 'http://products-srv:3000' },
      { name: 'accounts', paths: ['/accounts'], url: 'http://accounts-srv:3000' },
      { name: 'cart', paths: ['/cart'], url: 'http://cart-srv:3000' }
    ]
  })
);
