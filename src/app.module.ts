/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from '../config/env';
import { TracingModule } from 'trace-nestjs';
import { Logger } from 'gc-json-logger';
import { LoggerModule } from './Logger/logger.module';
import { CustomerModule } from './infrastructure/customer.module';


@Module({
  imports: [
    TracingModule.register({
      // specify which routes to trace
      routes: ['*'],
      onRequest(uuid, next) {
        // set a logger for the async context
        Logger.runWith(new Logger(uuid), next);
      },
    }),
    LoggerModule.register({
      // specify which routes to log
      routes: ['*'],
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', '127.0.0.0'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWORD', ''),
        database: configService.get('DB_DATABASE', 'new_cqrs'),
        // charset: 'utf8mb4',
        // timezone: '+08:00',
        //un comment this for first run insted migration
        //synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
