import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const admin = require('firebase-admin');
const serviceAccount = require('../cars-microservices-soa-firebase-adminsdk-t62jw-a640ea8882');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

/* eslint @typescript-eslint/no-var-requires: "off" */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4020,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3012);
  Logger.log('Car microservice running');
}
bootstrap();
