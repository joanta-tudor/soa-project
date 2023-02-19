import { CarService } from './car.service';
import { Car } from './car.entity';
import { CarDto } from './car.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class CarController {
    private readonly carService;
    private readonly client;
    private collection;
    constructor(carService: CarService, client: ClientProxy);
    getAllCars(): Promise<Car[]>;
    getAllTrendingCar(): Promise<Car[]>;
    save(carDto: CarDto): Promise<Car>;
    deleteCar(id: string): Promise<void>;
    private convertToCars;
}
