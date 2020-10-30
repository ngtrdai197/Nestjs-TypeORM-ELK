import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';

import { Photo } from './photo.entity';
import { CreatePhotoDto, EditPhotoDto } from './dtos';
import { UserService } from '../user/user.service';
import { BaseService } from '../common/services/base.service';

@Injectable()
export class PhotoService extends BaseService {
  constructor(
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    private userService: UserService,
    protected readonly connection: Connection,
  ) {
    super(connection);
  }

  async create(newPhoto: CreatePhotoDto) {
    const handler = async (queryRunner: QueryRunner) => {
      const manager = queryRunner.manager;
      const { url, userId } = newPhoto;
      const user = await this.userService.findOne(userId);
      manager.save(Photo, {
        url,
        user,
      });
    };
    this.performActionInTransaction(handler);
  }

  async updatePhoto(editPhoto: EditPhotoDto) {
    const handler = async (queryRunner: QueryRunner) => {
      const { manager } = queryRunner;
      const { id, url, userId } = editPhoto;
      const [photo, user] = await Promise.all([
        this.photoRepo.findOne(id),
        this.userService.findOne(userId),
      ]);
      photo.url = url;
      photo.user = user;
      manager.save(Photo, { url, user });
    };

    await this.performActionInTransaction(handler);
  }

  getPhotos(): Promise<Photo[]> {
    return this.photoRepo
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .andWhere('user.firstName = :name', { name: 'Dai' })
      .getMany();
  }
}
