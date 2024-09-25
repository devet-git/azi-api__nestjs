import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const configCors = (app: INestApplication) => {
  const setupCors: CorsOptions = {
    origin: ['http://192.168.188.70'],
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  };

  app.enableCors(setupCors);
};
