import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
import { IsString } from 'class-validator';

export class Car implements InMemoryDBEntity {
  @IsString() id: string;
  @IsString() name: string;
  @IsString() description: string;
}
