import { Connection, EntityRepository, getRepository } from 'typeorm';

import { BaseRepository } from '@/common/services/base.repository';
import { EditPhotoDto } from './dtos';
import { PhotoEntity } from './photo.entity';

@EntityRepository(PhotoEntity)
export class PhotoRepository extends BaseRepository<PhotoEntity> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }

  async updatePhoto(editPhoto: EditPhotoDto) {
    const { id, url } = editPhoto;
    return getRepository(PhotoEntity)
      .createQueryBuilder('photo')
      .update()
      .set({
        url,
      })
      .where('photo.id = :id', { id });
  }

  getPhotos(): Promise<PhotoEntity[]> {
    return getRepository(PhotoEntity)
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user_id', 'user')
      .andWhere('user.firstName = :name', { name: 'Dai' })
      .getMany();
  }
}
