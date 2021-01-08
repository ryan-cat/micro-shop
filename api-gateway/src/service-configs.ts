import { registerAs } from '@nestjs/config';
export interface ServiceConfiguration {
  name: string;
  paths: string[];
  url: string;
}

export default registerAs('services', (): ServiceConfiguration[] => [{ name: 'products', paths: ['/products'], url: 'http://products-srv:3000' }]);
