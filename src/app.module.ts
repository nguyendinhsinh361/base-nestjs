import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigGlobal } from './config/configGlobal';
import { DatabaseMongoConfig } from './config/mongo';
import { BullModule } from '@nestjs/bull';
import { BullOptions } from './config/bull';
import { DatabaseMySQLConfig } from './config/mysql';
import { moduleV1 } from './modules/v1';
import { moduleV2 } from './modules/v2';

@Module({
  imports: [
    DatabaseMongoConfig,
    DatabaseMySQLConfig,
    ConfigModule.forRoot(ConfigGlobal),
    BullModule.forRootAsync(BullOptions),
    ...moduleV1,
    ...moduleV2,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
