import { ErrorFilter } from '@micro-shop/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  });
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(3000);
}
bootstrap();
