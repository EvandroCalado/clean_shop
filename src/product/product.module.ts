import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './presentation/product.controller';
import { PRODUCT_REPOSITORY } from './application/ports/product-repository.port';
import { DrizzleProductRepository } from './infrastructure/adapters/drizzle-product.repository';
import { CommandHandlers } from './application';
import { QueryHandlers } from './application/queries/handlers';
import { ConfigService } from '@nestjs/config';
import { MongoProductRepository } from './infrastructure/adapters/mongo-product.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    MongoProductRepository,
    DrizzleProductRepository,
    {
      provide: PRODUCT_REPOSITORY,
      useFactory: (
        configService: ConfigService,
        mongoRepository: MongoProductRepository,
        drizzleRepository: DrizzleProductRepository,
      ) => {
        return configService.get('DATABASE') === 'mongodb'
          ? mongoRepository
          : drizzleRepository;
      },
      inject: [ConfigService, MongoProductRepository, DrizzleProductRepository],
    },
  ],
})
export class ProductModule {}
