/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { CreateCustomerHandler } from 'src/application/command/customer/create-customer.handler';
import { FindAllCustomerHandler } from 'src/application/query/customer/find-all-customer.hendler';
import { FindCustomerHandler } from 'src/application/query/customer/find-customer.hendler';

export const cqrsHandlerProvider: Provider[] = [
  FindAllCustomerHandler,
  FindCustomerHandler,
  CreateCustomerHandler,
];
