/* eslint-disable prettier/prettier */
import { Provider } from '@nestjs/common';
import { ICustomerService } from '../../../domain/port/input/customer-service.interface';
import { CustomerService } from '../../../domain/service/customer.service';
import { ICacheService } from 'src/domain/port/input/cache-service.interface';
import { CacheService } from 'src/domain/service/cache.service';
import { IEncoderService } from 'src/domain/port/input/encoder-service.interface';
import { Base62EncoderService } from 'src/domain/service/base62-encoder.service';

export const servicesProvider: Provider[] = [
  {
    provide: ICustomerService,
    useClass: CustomerService,
  },
  {
   provide: ICacheService,
   useClass: CacheService,
  },
  {
    provide: IEncoderService,
    useClass: Base62EncoderService,
  },
  
];
