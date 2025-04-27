import { CustomerEntity } from '../../../infrastructure/entity/customer.entity';

export interface ICacheRepository {
  save(payload: CustomerEntity): Promise<void>;
  findByKey(id: string): Promise<CustomerEntity | null>;
}

export const ICacheRepository = Symbol.for('ICacheRepository');
