import { Injectable, Logger } from '@nestjs/common';
import { Car } from './car.entity';
import {
  InjectInMemoryDBService,
  InMemoryDBService,
} from '@nestjs-addons/in-memory-db';
import { CarDto } from './car.dto';

@Injectable()
export class CarService {
  constructor(
    @InjectInMemoryDBService('car')
    private readonly db: InMemoryDBService<Car>,
  ) {
    this.db.create({
      name: 'Ferrari',
      description:
        'Every Ferrari car takes roughly 3 months to complete. And it all begins in the foundry of the company where the most critical job of casting the engine is done. These parts are then delivered to the assembly line where 147 engines are hand-built everyday!',
    });
  }
  async findAll(): Promise<Car[]> {
    const cars = this.db.getAll();
    return cars;
  }

  async save(carDto: CarDto): Promise<Car> {
    const car = this.db.create({
      name: carDto.name,
      description: carDto.description,
    });
    return car;
  }

  async remove(id: string) {
    // const car = this.db.query((car) => car.name == name)[0];
    this.db.delete(id);
  }
}
