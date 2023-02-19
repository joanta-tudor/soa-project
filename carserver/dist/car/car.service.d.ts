import { Car } from './car.entity';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { CarDto } from './car.dto';
export declare class CarService {
    private readonly db;
    constructor(db: InMemoryDBService<Car>);
    findAll(): Promise<Car[]>;
    save(carDto: CarDto): Promise<Car>;
    remove(id: string): Promise<void>;
}
