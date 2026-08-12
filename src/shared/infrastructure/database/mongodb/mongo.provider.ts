import { ConfigService } from '@nestjs/config';
import { Db, MongoClient } from 'mongodb';

export const MONGODB = Symbol('MONGODB');

export const MongoProvider = {
  provide: MONGODB,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService): Promise<Db> => {
    const uri = configService.getOrThrow<string>('MONGODB_URI');
    const dbName = configService.get<string>('MONGODB_NAME', 'clean_shop');
    const client = new MongoClient(uri);

    await client.connect();

    return client.db(dbName);
  },
};
