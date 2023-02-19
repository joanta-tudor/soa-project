import { IsString } from 'class-validator';

export class CarDto {
  @IsString() name: string;
  @IsString() description: string;
}
