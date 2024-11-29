import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfiguration } from '@config/orm.config';
import { HealthModule } from '@modules/health/health.module';
import { TodoModule } from '@modules/todo/todo.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TransformRequestInterceptor } from '@shared/interceptors/transform-request.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: OrmConfiguration,
    }),
    HealthModule,
    TodoModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformRequestInterceptor,
    },
  ],
})
export class AppModule {}
