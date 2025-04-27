/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ICustomerService } from '../../../domain/port/input/customer-service.interface';
import { FindCustomerQuery } from './find-customer.query';
import { CustomerEntity } from '../../../infrastructure/entity/customer.entity';

@QueryHandler(FindCustomerQuery)
export class FindCustomerHandler
  implements IQueryHandler<FindCustomerQuery>
{
  constructor(
    @Inject(ICustomerService)
    private readonly customerService: ICustomerService,
  ) {}

  async execute(query: FindCustomerQuery): Promise<CustomerEntity | null> {
    //console.log(`2-query handler-getAllCustomers`);
    return this.customerService.findById(query.Id);
  }
}
