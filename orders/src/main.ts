import { ErrorFilter } from '@micro-shop/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('orders');
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(3000);
}
bootstrap();
