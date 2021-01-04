import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => {
  const config: PostgresConnectionOptions = {
    type: 'postgres',
    url: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_URL}/${process.env.POSTGRES_DB}`,
    ssl:
      process.env.DATABASE_SSL === 'true' || process.env.DATABASE_SSL === undefined
        ? {
            rejectUnauthorized: false
          }
        : undefined,
    cli: {
      migrationsDir: 'src/migrations'
    }
  };
  return config;
};
