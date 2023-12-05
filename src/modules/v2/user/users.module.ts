import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, RequestMethod, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';
import { JwtService } from '@root/common/helpers/jwt.helper';
import { AuthModule } from '../auth/auth.module';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule, UsersService],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtService],
})
export class UsersModule {
  public configure(consumer: NestMiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/profile', method: RequestMethod.GET },
        { path: 'users/:userId', method: RequestMethod.PUT },
        { path: 'users/delete-user', method: RequestMethod.DELETE },
      );
  }
}
