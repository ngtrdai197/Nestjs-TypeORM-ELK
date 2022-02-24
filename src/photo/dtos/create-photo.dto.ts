import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
