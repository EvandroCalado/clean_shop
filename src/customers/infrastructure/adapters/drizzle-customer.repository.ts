import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepositoryPort } from 'src/customers/application/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';
import { Email } from 'src/customers/domain/value-objects/email.vo';
import {
  DRIZZLE,
  DrizzleDB,
} from 'src/shared/infrastructure/database/postgres/drizzle.provider';
import { customers } from 'src/shared/infrastructure/database/postgres/schema';

@Injectable()
export class DrizzleCustomerRepository implements CustomerRepositoryPort {
  constructor(
    @Inject(DRIZZLE)
    private readonly db: DrizzleDB,
  ) {}

  async save(customer: Customer): Promise<void> {
    const data = DrizzleCustomerRepository.toPersistence(customer);

    await this.db
      .insert(customers)
      .values(data)
      .onConflictDoUpdate({
        target: customers.id,
        set: {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          isActive: data.isActive,
          updatedAt: data.updatedAt,
        },
      });
  }

  findById(id: CustomerId): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: Email): Promise<Customer | null> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<Customer[]> {
    throw new Error('Method not implemented.');
  }

  delete(id: CustomerId): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private static toPersistence(
    customer: Customer,
  ): typeof customers.$inferSelect {
    return {
      id: customer.getId().getValue(),
      email: customer.getEmail().getValue(),
      firstName: customer.getFirstName(),
      lastName: customer.getLastName(),
      phone: customer.getPhone(),
      isActive: customer.getIsActive(),
      createdAt: customer.getCreatedAt(),
      updatedAt: customer.getUpdatedAt(),
    };
  }
}
