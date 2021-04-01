import { BadRequestException, Injectable } from '@nestjs/common';

import { CreatePhotoDto, EditPhotoDto } from './dtos';
import { PhotoRepository } from './photo.repository';
import { PhotoEntity } from './photo.entity';
import { UserService } from '@/user/user.service';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly userService: UserService,
  ) {
  }

  async createPhoto(userId: string, newPhoto: CreatePhotoDto) {
    const found = await this.userService.getUserById(userId);
    if (!found)
      throw new BadRequestException({
        statusCode: 400,
        msg: 'User does not exists',
      });
    return this.photoRepository.save(newPhoto);
  }

  async updatePhoto(editPhoto: EditPhotoDto) {
    const exist = await this.photoRepository.findOne(editPhoto.id);
    if (!exist)
      throw new BadRequestException({
        statusCode: 400,
        msg: 'Photo does not exists',
      });
    return this.photoRepository.updatePhoto(editPhoto);
  }

  getPhotos(): Promise<PhotoEntity[]> {
    return this.photoRepository.getPhotos();
  }
}
