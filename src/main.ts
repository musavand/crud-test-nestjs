/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './infrastructure/config/log/console.logger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
     {bufferLogs: true},
  );
  const config = app.get(ConfigService);

  app.useLogger(app.get(AppLogger));

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = config.get<number>('PORT') ?? 3000;
  console.log(`port is=${config.get<number>('PORT')}`);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mason-Chase Api Documentation')
    .setDescription('Mason-Chase Api Documentation By mehdi musavand')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync('./swagger-spec.json',JSON.stringify(document));
  SwaggerModule.setup('docs', app, document);
  await app.listen(port);
}
bootstrap();
