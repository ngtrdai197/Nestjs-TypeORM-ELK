import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto, EditPhotoDto } from './dtos';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    private userService: UserService,
  ) {}

  async create(newPhoto: CreatePhotoDto): Promise<Photo> {
    const { url, userId } = newPhoto;
    const user = await this.userService.findOne(userId);
    const photo = new Photo();
    photo.url = url;
    photo.user = user;
    return this.photoRepo.save(photo);
  }

  async updatePhoto(editPhoto: EditPhotoDto): Promise<Photo> {
    const { id, url, userId } = editPhoto;
    const [photo, user] = await Promise.all([
      this.photoRepo.findOne(id),
      this.userService.findOne(userId),
    ]);
    photo.url = url;
    photo.user = user;
    return this.photoRepo.save(photo);
  }

  getPhotos(): Promise<Photo[]> {
    return this.photoRepo
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user', 'photo.user_id = user.id')
      .getMany();
  }
}
