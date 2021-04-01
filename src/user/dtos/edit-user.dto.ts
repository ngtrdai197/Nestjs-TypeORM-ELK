import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  isActive: boolean;
}
