import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { SwaggerSetting } from './config/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<number>('PORT') || 8000;
  // Use global validation pipe.
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  SwaggerSetting(app);
  //TODO
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ limit: '10mb', extended: true }));

  // Enable CORS for AWS.
  app.enableCors();
  const server = await app.listen(port);
  const timeout = 1000 * 60 * 3;
  server.setTimeout(timeout);
}
bootstrap();
