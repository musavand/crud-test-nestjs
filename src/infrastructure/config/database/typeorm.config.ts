/* eslint-disable prettier/prettier */
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

const envFilePath = `.env.${process.env.NODE_ENV}`;

config({
  path: envFilePath,
});

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'new_cqrs',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  entities: ['**/*.entity.ts'],
  migrations: ['./src/**/migrations/*-migration.ts'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
};

export default new DataSource(dataSourceOptions);
