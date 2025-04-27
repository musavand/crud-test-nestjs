import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { ICustomerRepository } from '../../../../domain/port/output/customer-repository.interface';
import { CustomerEntity } from '../../../entity/customer.entity';

@Injectable()
export class CustomerRepositoryAdapter implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async findById(id: string): Promise<CustomerEntity | null> {
    return this.repository.findOneBy({ id });
  }
  async findAll(): Promise<CustomerEntity[] | null> {
    return this.repository.find();
  }
  async findByEMail(Email: string): Promise<CustomerEntity | null> {
    return this.repository.findOneBy({ Email });
  }

  async save(partialEntity: Partial<CustomerEntity>): Promise<CustomerEntity> {
    return this.repository.save(partialEntity);
  }
}
