import { Inject, Injectable } from '@nestjs/common';
import {
  ProductFilters,
  ProductRepositoty,
} from 'src/product/application/ports/product-repository.port';
import { Product } from 'src/product/domain/entities/product.entity';
import { ProductId } from 'src/product/domain/value-object/product-id.vo';
import {
  DRIZZLE,
  type DrizzleDB,
} from 'src/shared/infrastructure/database/postgres/drizzle.provider';

@Injectable()
export class DrizzleProductRepository implements ProductRepositoty {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async save(procuct: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: ProductId): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }
  findAll(filters: ProductFilters): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
}
