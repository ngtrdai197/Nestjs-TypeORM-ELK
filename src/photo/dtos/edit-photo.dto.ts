import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditPhotoDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  url?: string;
}
