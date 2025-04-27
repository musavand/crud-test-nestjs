import { Inject, Injectable } from '@nestjs/common';

import { AppLogger } from '../../infrastructure/config/log/console.logger';
import { CustomerEntity } from '../../infrastructure/entity/customer.entity';
import { ICacheService } from '../port/input/cache-service.interface';
import { ICacheRepository } from '../port/output/cache-repository.interface';

@Injectable()
export class CacheService implements ICacheService {
  constructor(
    private readonly logger: AppLogger,
    @Inject(ICacheRepository)
    private readonly cacheRepository: ICacheRepository,
  ) {
    this.logger.setContext(CacheService.name);
  }

  /**
   * Find a cached url by its shortened URL
   *
   * @param {string} id Shortened URL
   * @return {Promise<string|null>}
   */
  async findByKey(id: string): Promise<string | null> {
    const urlFromCache = await this.cacheRepository.findByKey(id);
    if (!urlFromCache) return null;
    this.logger.verbose(`URL loaded from cache [${id}]`);
    return urlFromCache.Email;
  }

  /**
   * Caches a URL Entity for 60 seconds.
   *
   * @param {UrlEntity} urlEntity URL Entity.
   * @return {Promise<void>}
   */
  async save(customerEntity: CustomerEntity): Promise<void> {
    this.logger.verbose(`Caching Customer... [${customerEntity.Email}]`);
    await this.cacheRepository.save(customerEntity);
  }
}
