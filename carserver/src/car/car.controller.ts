import {
  Controller,
  UseGuards,
  Get,
  Delete,
  Param,
  Post,
  Body,
  Inject,
  Logger,
} from '@nestjs/common';
import { CarService } from './car.service';
import { Car } from './car.entity';
import { MyAuthGuard } from '../guard/MyAuthGuard';
import { CarDto } from './car.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firestore } from 'firebase-admin';
import DocumentSnapshot = firestore.DocumentSnapshot;
import QuerySnapshot = firestore.QuerySnapshot;

@Controller('cars')
export class CarController {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  constructor(
    private readonly carService: CarService,
    @Inject('USER_CLIENT') private readonly client: ClientProxy,
  ) {
    this.collection = firestore().collection('trendingCars');
  }
  @UseGuards(MyAuthGuard)
  @Get('')
  async getAllCars(): Promise<Car[]> {
    Logger.log('Getting all cars...');
    return this.carService.findAll();
  }

  @UseGuards(MyAuthGuard)
  @Get('trending')
  async getAllTrendingCar(): Promise<Car[]> {
    Logger.log('Getting all trending cars...');

    return this.collection.get().then((querySnapshot: QuerySnapshot<Car>) => {
      if (querySnapshot.empty) {
        return [];
      }

      const cars: Car[] = [];
      for (const doc of querySnapshot.docs) {
        cars.push(this.convertToCars(doc));
      }

      return cars;
    });
  }

  @UseGuards(MyAuthGuard)
  @Post('save')
  async save(@Body() carDto: CarDto): Promise<Car> {
    const car = this.carService.save(carDto);
    Logger.log('New car saved');
    this.client.emit('car-saved-event', { name: carDto.name });
    return car;
  }

  @UseGuards(MyAuthGuard)
  @Delete('delete/:id')
  async deleteCar(@Param('id') id: string) {
    await this.carService.remove(id);
    Logger.log('Car deleted');
  }

  private convertToCars(querySnapshot: DocumentSnapshot<Car>) {
    if (!querySnapshot.exists) {
      console.log(`no cars found with the given id`);
    }

    const todo = querySnapshot.data();
    console.log('DATA: ', querySnapshot.data());

    return {
      id: querySnapshot.id,
      name: todo.name,
      description: todo.description,
    };
  }
}
