import { Injectable } from '@nestjs/common';
import { CustomerRepositoryPort } from 'src/customers/application/ports/customer.repository';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';
import { Email } from 'src/customers/domain/value-objects/email.vo';

@Injectable()
export class DrizzleCustomerRepository implements CustomerRepositoryPort {
  save(customer: Customer): Promise<void> {
    throw new Error('Method not implemented.');
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
}
