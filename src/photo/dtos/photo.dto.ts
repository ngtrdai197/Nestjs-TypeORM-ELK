import { BaseDto } from '@/common/dtos/base.dto';
import { IsOptional, IsString } from 'class-validator';


export class PhotoDto extends BaseDto {
  @IsOptional()
  @IsString()
  url: string;
}
