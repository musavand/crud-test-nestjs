import { CustomerEntity } from '../../../infrastructure/entity/customer.entity';

export interface ICustomerRepository {
  findByEMail(Email: string): Promise<CustomerEntity | null>;
  findById(id: string): Promise<CustomerEntity | null>;
  findAll(): Promise<CustomerEntity[] | null>;
  save(partialEntity: Partial<CustomerEntity>): Promise<CustomerEntity>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
