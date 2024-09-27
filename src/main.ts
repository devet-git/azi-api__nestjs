import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SuccessResponseInterceptor } from './interceptors/success-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //TODO: Swagger config
  const config = new DocumentBuilder()
    .setTitle('Azi API')
    .setDescription('The Professional API for Azi Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  //TODO: Enable Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException(errors.map((err) => `${err.property}: ${Object.values(err.constraints).join(', ')}`));
      },
    }),
  );

  app.useGlobalInterceptors(new SuccessResponseInterceptor());

  app.enableCors({
    origin: ['http://192.168.188.70:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    // allowedHeaders: 'Content-Type, Accept, Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(5555);
}
bootstrap();
