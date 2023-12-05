import {
  ValidationPipe,
  INestApplication,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APIPrefix } from 'src/common/constants/common';

export const SwaggerSetting = (app: INestApplication) => {
  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: [VERSION_NEUTRAL, '1', '2'],
    })
    .setGlobalPrefix(APIPrefix);

  const options = new DocumentBuilder()
    .setTitle('Core Base NestJs Project')
    .setDescription('The Back-end API description')
    .setVersion('1.0')
    .addSecurity('ApiKeyAuth', {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addSecurityRequirements('ApiKeyAuth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const versionedPaths = ['/api/v1', '/api/v2'];

  document.paths = Object.keys(document.paths)
    .filter((path) => versionedPaths.some((vp) => path.startsWith(vp)))
    .reduce((obj, key) => {
      obj[key] = document.paths[key];
      return obj;
    }, {});
  SwaggerModule.setup(`${APIPrefix}/docs`, app, document);
};
