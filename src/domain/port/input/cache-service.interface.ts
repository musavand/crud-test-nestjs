import { CustomerEntity } from '../../../infrastructure/entity/customer.entity';

export interface ICacheService {
  save(customerEntity: CustomerEntity): Promise<void>;
  findByKey(id: string): Promise<string | null>;
}

export const ICacheService = Symbol('ICacheService');
