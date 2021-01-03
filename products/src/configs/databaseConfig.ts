import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => {
  const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_URL}/${process.env.POSTGRES_DB}`,
    // entities: [process.env.DATABASE_ENTITIES || 'src/**/*Models.js'],
    synchronize: process.env.DATABASE_SYNCHRONIZE !== undefined ? process.env.DATABASE_SYNCHRONIZE === 'true' : false,
    ssl:
      process.env.DATABASE_SSL === 'true' || process.env.DATABASE_SSL === undefined
        ? {
            rejectUnauthorized: false
          }
        : undefined,
    migrations: ['src/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/migrations'
    }
  };
  return config;
};
