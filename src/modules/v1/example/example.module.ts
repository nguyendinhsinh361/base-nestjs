import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';
import { Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@root/common/helpers/jwt.helper';
import { UsersModule } from '../user/users.module';
import { Example, ExampleSchema } from './schema/example.schema';
import { ExamplesController } from './example.controller';
import { ExamplesService } from './example.service';
import { ExamplesRepository } from './example.repository';
import { AuthMiddleware } from '../middleware/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Example.name, schema: ExampleSchema }]),
    UsersModule,
  ],
  exports: [],
  controllers: [ExamplesController],
  providers: [ExamplesService, ExamplesRepository, JwtService],
})
export class ExampleModule {
  public configure(consumer: NestMiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'examples', method: RequestMethod.GET },
        { path: 'examples/:exampleId', method: RequestMethod.GET },
      );
  }
}
