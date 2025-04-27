/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICustomerService } from '../../../domain/port/input/customer-service.interface';
import { FindAllCustomerQuery } from './find-all-customer.query';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';

@QueryHandler(FindAllCustomerQuery)
export class FindAllCustomerHandler
  implements IQueryHandler<FindAllCustomerQuery>
{
  constructor(
    @Inject(ICustomerService)
    private readonly customerService: ICustomerService,
  ) {}

  async execute(query: FindAllCustomerQuery): Promise<CustomerEntity[] | null> {
    //console.log(`2-query handler-getAllCustomers`);
    return this.customerService.findAll();
  }
}
