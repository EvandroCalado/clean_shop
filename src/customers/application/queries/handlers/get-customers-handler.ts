import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../get-customers.query';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { Inject } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepositoryPort,
} from '../../ports/customer-repository.port';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';
import {
  ApplicationException,
  ApplicationExceptionCode,
} from 'src/shared/domain/exceptions/application.exception';

@QueryHandler(GetCustomersQuery)
export class GetCustomershandler implements IQueryHandler<
  GetCustomersQuery,
  Customer
> {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(query: GetCustomersQuery): Promise<Customer> {
    const customer = await this.customerRepository.findById(
      new CustomerId(query.customerId),
    );

    if (!customer) {
      throw new ApplicationException(
        `Customer with id ${query.customerId} not found`,
        ApplicationExceptionCode.NOT_FOUND,
      );
    }

    return customer;
  }
}
