import { Module } from '@nestjs/common';
import { CustomerController } from './adapter/input/controller/customer.controller';
import { CustomerEntity } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cqrsHandlerProvider } from './config/provider/cqrs-handler.provider';
import { servicesProvider } from './config/provider/service.provider';
import { repositoryProvider } from './config/provider/repository.provider';
import { AppLogger } from './config/log/console.logger';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'src/domain/schema/config.schema';
import { PersistenceModule } from './config/database/persistence.module';
import { CacheDatabaseModule } from './config/database/factory/cache-database.module';
import { InMemoryThrottlerModule } from './config/throttler/in-memory-throttler.module';
const envFilePath = `.env.${process.env.NODE_ENV}`;

@Module({
  imports: [
    //TypeOrmModule.forFeature([CustomerEntity
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: configSchema,
    }),
    TypeOrmModule.forFeature([CustomerEntity]),
    CqrsModule.forRoot(),
    PersistenceModule,
    CacheDatabaseModule,
    InMemoryThrottlerModule,
  ],
  providers: [
    AppLogger,
    ...cqrsHandlerProvider,
    ...servicesProvider,
    ...repositoryProvider,
  ],
  controllers: [CustomerController],
  exports: [CqrsModule],
})
export class CustomerModule {}
