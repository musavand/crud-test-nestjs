import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { CustomerEntity } from '../../../entity/customer.entity';

export const mysqlClientFactory = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  database: configService.get<string>('DB_NAME'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  logging: configService.get<boolean>('DB_LOGGING_ENABLED') || false,
  entities: [CustomerEntity],
  synchronize: false,
  migrationsRun: false,
});
