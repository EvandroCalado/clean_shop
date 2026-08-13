import { ProductId } from 'src/product/domain/value-object/product-id.vo';
import { Product } from 'src/product/domain/entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductFilters {
  isActive?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductRepositoty {
  save(procuct: Product): Promise<void>;
  findById(id: ProductId): Promise<Product | null>;
  findAll(filters: ProductFilters): Promise<Product[]>;
}
