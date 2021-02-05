import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app-controller';
import gatewayConfig from './gateway-config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [gatewayConfig]
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_KEY')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [JwtStrategy],
  controllers: [AppController]
})
export class AppModule {}
