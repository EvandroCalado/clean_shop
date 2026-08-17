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
import { products } from 'src/shared/infrastructure/database/postgres/schema';

@Injectable()
export class DrizzleProductRepository implements ProductRepositoty {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async save(procuct: Product): Promise<void> {
    const row = DrizzleProductRepository.toPersistence(procuct);
    await this.db
      .insert(products)
      .values(row)
      .onConflictDoUpdate({
        target: products.id,
        set: {
          ...row,
        },
      });
  }

  async findById(id: ProductId): Promise<Product | null> {
    throw new Error('Method not implemented.');
  }

  async findAll(filters: ProductFilters): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }

  private static toPersistence(product: Product): typeof products.$inferSelect {
    return {
      id: product.id.getValue(),
      name: product.name,
      description: product.description,
      priceAmount: product.price.getAmount(),
      priceCurrency: product.price.getCurrency(),
      sku: product.sku.getValue(),
      stock: product.stock,
      isActive: product.isActive,
      lowStockThreshold: product.lowStockThreshold,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
