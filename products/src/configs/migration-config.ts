import databaseConfig from './database-config';

let config = {
  ...databaseConfig(),
  migrations: ['src/migrations/*.ts']
};

if (process.env.MIGRATION_URL) {
  config = {
    ...config,
    url: process.env.MIGRATION_URL,
    entities: ['src/**/*-models.ts']
  };
}

export default config;
