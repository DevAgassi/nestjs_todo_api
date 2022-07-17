import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Test project')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('test')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const dbService: PrismaService = app.get(PrismaService);
  dbService.enableShutdownHooks(app);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(9000);
}
bootstrap();
