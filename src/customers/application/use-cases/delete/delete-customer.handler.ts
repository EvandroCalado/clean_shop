import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from './delete-customer.command';
import { Inject } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepositoryPort,
} from '../../ports/customer.repository';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';
import {
  ApplicationException,
  ApplicationExceptionCode,
} from 'src/shared/domain/exceptions/application.exception';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler implements ICommandHandler<
  DeleteCustomerCommand,
  void
> {
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async execute(command: DeleteCustomerCommand): Promise<void> {
    const customerId = new CustomerId(command.id);

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new ApplicationException(
        `Customer with id ${command.id} not found`,
        ApplicationExceptionCode.NOT_FOUND,
      );
    }

    await this.customerRepository.delete(customerId);
  }
}
