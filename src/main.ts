import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type Configuration = {
  prefix: string;
  title: string;
  description: string;
  version: string;
};

const configuration: Configuration = {
  prefix: 'api',
  title: 'Cube',
  description: 'Cube backend',
  version: '1.0.0',
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(configuration.prefix);

  const config = new DocumentBuilder()
    .setTitle(configuration.title)
    .setDescription(configuration.description)
    .setVersion(configuration.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configuration.prefix, app, document);

  await app.listen(3001);
}
bootstrap();
