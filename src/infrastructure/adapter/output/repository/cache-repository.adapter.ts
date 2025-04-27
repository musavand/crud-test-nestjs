/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ICacheRepository } from '../../../../domain/port/output/cache-repository.interface';
import { CustomerEntity } from '../../../entity/customer.entity';
import { RedisDao } from '../dao/redis.dao';

@Injectable()
export class CacheRepositoryAdapter implements ICacheRepository {
  private readonly key: string = 'shortco:url';

  constructor(private readonly redisDao: RedisDao) {}

  async save(payload: CustomerEntity): Promise<void> {
    const key = this.generateKey("mykey");
    await this.redisDao.set(key, JSON.stringify(payload));
    await this.redisDao.expire(key, 60);
  }

  async findByKey(id: string): Promise<CustomerEntity | null> {
    const cachedUrl = await this.redisDao.get(this.generateKey(id));
    if (!cachedUrl) {
      return null;
    }
    return plainToInstance(CustomerEntity, JSON.parse(cachedUrl));
  }

  private generateKey(id?: string): string {
    const prefix = this.key;
    const keys = [prefix];
    if (id) keys.push(id);
    return keys.join(':');
  }
}
