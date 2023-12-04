import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class TypeOrmPostgresConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      // ssl: { rejectUnauthorized: false },
      logging: true,
      synchronize: true,
      entities: [__dirname + '/entities/**/*.entity.{ts,js}'],
      migrations: ['./db/migrations/*.ts'],
    };
  }
}
