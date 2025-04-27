/* eslint-disable @typescript-eslint/no-unused-vars */
import { Command } from '@nestjs/cqrs';
import { CreateCustomerDto } from 'src/domain/dto/create-customer.dto';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';

export class CreateCustomerCommand extends Command<CustomerEntity | null> {
  private readonly _createCustomerDto: CreateCustomerDto;

  constructor(createCustomerDto: CreateCustomerDto) {
    super();
    this._createCustomerDto = createCustomerDto;
  }

  get GetCustomerEntity(): CreateCustomerDto {
    return this._createCustomerDto;
  }
}
