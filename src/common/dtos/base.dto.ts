import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export abstract class BaseDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt?: Date;

  @IsString()
  @IsNotEmpty()
  createdBy?: string;

  @IsDateString()
  @IsNotEmpty()
  updatedAt?: Date;

  @IsString()
  @IsNotEmpty()
  updatedBy?: string;
}
