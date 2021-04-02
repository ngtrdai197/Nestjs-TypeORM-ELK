import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { PhotoRepository } from './photo.repository';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository]), UserModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
