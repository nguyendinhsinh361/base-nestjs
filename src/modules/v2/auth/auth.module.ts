import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { Module, RequestMethod, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../user/users.module';
import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';
import { JwtService } from '@root/common/helpers/jwt.helper';
import { RTMiddleware } from '../middleware/rt.middleware';
@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwt.access_token_secret'),
          signOptions: {
            expiresIn: `${configService.get('jwt.access_token_ttl')}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {
  public configure(consumer: NestMiddlewareConsumer) {
    consumer
      .apply(RTMiddleware)
      .forRoutes(
        { path: 'auth/refresh', method: RequestMethod.POST },
        { path: 'auth/logout', method: RequestMethod.POST },
      );
  }
}
