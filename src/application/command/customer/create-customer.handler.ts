/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ICustomerService } from '../../../domain/port/input/customer-service.interface';

import { CreateCustomerCommand } from '../customer/create-customer.command';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @Inject(ICustomerService)
    private readonly customerService: ICustomerService,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<CustomerEntity | null> {

    return this.customerService.save(command.GetCustomerEntity);
  }
}
