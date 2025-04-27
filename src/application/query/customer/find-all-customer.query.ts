/* eslint-disable prettier/prettier */
import { Query } from '@nestjs/cqrs';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';
export class FindAllCustomerQuery extends Query<CustomerEntity[] | null> {
}
