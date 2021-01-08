import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app-controller';
import serviceConfigs from './service-configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfigs]
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
