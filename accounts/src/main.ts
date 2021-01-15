import { NestFactory } from '@nestjs/core';
import { ErrorFilter } from './errors';
import { AppModule } from './modules/app-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('accounts');
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(3000);
}
bootstrap();
