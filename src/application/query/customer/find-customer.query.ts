/* eslint-disable prettier/prettier */
import { Query } from '@nestjs/cqrs';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';
export class FindCustomerQuery extends Query<CustomerEntity | null> {
  private readonly _Id: string;
  constructor(Id: string) {
    super();
    this._Id = Id;
  }
  get Id(): string {
    return this._Id;
  }
}
