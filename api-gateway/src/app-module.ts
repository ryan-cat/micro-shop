import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app-controller';
import gatewayConfig from './gateway-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [gatewayConfig]
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
