import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseMongoConfig = MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const uri = configService.get<string>('mongodb.uri_mongodb');
    return {
      uri: uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  },
  inject: [ConfigService],
});
