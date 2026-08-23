import { ProductId } from 'src/product/domain/value-object/product-id.vo';
import { Product } from 'src/product/domain/entities/product.entity';
import { Sku } from 'src/product/domain/value-object/sku.vo';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductFilters {
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductRepository {
  save(procuct: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findBySku(sku: Sku): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  findAll(filters: ProductFilters): Promise<Product[]>;
  delete(id: ProductId): Promise<void>;
}
