import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
@Module({
  imports: [
    InMemoryDBModule.forFeature('car', {}),
    ClientsModule.register([
      {
        name: 'AUTH_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4001,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4010,
        },
      },
    ]),
  ],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
