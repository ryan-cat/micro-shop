import { CacheModuleOptions } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

export default (): CacheModuleOptions => ({
  store: redisStore,
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  auth_pass: process.env.CACHE_PASSWORD,
  db: 0
});
