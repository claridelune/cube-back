import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

type DbType = 'mysql';

@Injectable()
export class OrmConfiguration implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const typeDb = this.configService.get<DbType>('DB_TYPE');
    const hostDb = this.configService.get<string>('DB_HOST');
    const portDb = this.configService.get<number>('DB_PORT');
    const usernameDb = this.configService.get<string>('DB_USERNAME');
    const passwordDb = this.configService.get<string>('DB_PASSWORD');
    const schemaDb = this.configService.get<string>('DB_SCHEMA');

    return {
      type: typeDb,
      host: hostDb,
      port: portDb,
      username: usernameDb,
      password: passwordDb,
      database: schemaDb,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
