import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
