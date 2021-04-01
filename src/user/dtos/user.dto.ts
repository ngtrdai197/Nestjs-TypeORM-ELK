import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { BaseDto } from '@/common/dtos/base.dto';

export class UserDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
