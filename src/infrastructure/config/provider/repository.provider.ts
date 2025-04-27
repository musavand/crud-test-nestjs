import { Provider } from '@nestjs/common';

import { ICacheRepository } from '../../../domain/port/output/cache-repository.interface';
import { ICustomerRepository } from '../../../domain/port/output/customer-repository.interface';
import { CacheRepositoryAdapter } from '../../adapter/output/repository/cache-repository.adapter';
import { CustomerRepositoryAdapter } from 'src/infrastructure/adapter/output/repository/customer-repository.adapter';

export const repositoryProvider: Provider[] = [
  {
    provide: ICustomerRepository,
    useClass: CustomerRepositoryAdapter,
  },
  {
    provide: ICacheRepository,
    useClass: CacheRepositoryAdapter,
  },
];
