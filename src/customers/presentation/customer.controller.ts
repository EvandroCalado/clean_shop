import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCustomerDto } from './dto/register-customer.dto';
import { RegisterCustomerCommand } from '../application/use-cases/register-customer/register-customer.command';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { ListCustomersQuery } from '../application/queries/list-customers.query';
import { Customer } from '../domain/entities/customer.entity';
import { GetCustomersQuery } from '../application/queries/get-customers.query';
import { DeleteCustomerCommand } from '../application/use-cases/delete/delete-customer.command';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async register(@Body() dto: RegisterCustomerDto): Promise<void> {
    await this.commandBus.execute<RegisterCustomerCommand, void>(
      new RegisterCustomerCommand(
        dto.email,
        dto.firstName,
        dto.lastName,
        dto.phone,
      ),
    );
  }

  @Get()
  async findAll(): Promise<CustomerResponseDto[]> {
    const customers = await this.queryBus.execute<
      ListCustomersQuery,
      Customer[]
    >(new ListCustomersQuery());

    return customers.map((customer) =>
      CustomerResponseDto.fromDomain(customer),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CustomerResponseDto> {
    const customer = await this.queryBus.execute<GetCustomersQuery, Customer>(
      new GetCustomersQuery(id),
    );

    return CustomerResponseDto.fromDomain(customer);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.commandBus.execute<DeleteCustomerCommand, void>(
      new DeleteCustomerCommand(id),
    );
  }
}
