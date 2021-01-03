import databaseConfig from './databaseConfig';
console.log('here', process.env.MIGRATION_URL);
export default {
  ...databaseConfig()
};
