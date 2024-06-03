import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { Server } from 'http';

let cachedServer: Server;

async function bootstrap(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  return app;
}

export default async function handler(req, res) {
  if (!cachedServer) {
    const app = await bootstrap();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  cachedServer.emit('request', req, res);
}