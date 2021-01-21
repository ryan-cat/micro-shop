import { MongooseModuleOptions } from '@nestjs/mongoose';

export default (): MongooseModuleOptions => ({
  uri: `mongodb://${process.env.MONGO_URL}/products`,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  authSource: 'admin'
});
