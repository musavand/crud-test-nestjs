/* eslint-disable prettier/prettier */
import { CreateCustomerDto } from 'src/domain/dto/create-customer.dto';
import { CustomerEntity } from 'src/infrastructure/entity/customer.entity';

export interface ICustomerService {
  save(customer: CreateCustomerDto): Promise<CustomerEntity | null>;
  findById(id: string): Promise<CustomerEntity | null>;
  findAll(): Promise<CustomerEntity[] | null>;
}

export const ICustomerService = Symbol('ICustomerService');
