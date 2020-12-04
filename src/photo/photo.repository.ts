import { Connection, EntityRepository, getRepository } from 'typeorm';

import { BaseRepository } from '../common/services/base.repository';
import { EditPhotoDto } from './dtos';
import { Photo } from './photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends BaseRepository<Photo> {
  constructor(protected readonly connection: Connection) {
    super(connection);
  }

  async updatePhoto(editPhoto: EditPhotoDto) {
    const { id, url } = editPhoto;
    return getRepository(Photo)
      .createQueryBuilder('photo')
      .update()
      .set({
        url,
      })
      .where('photo.id = :id', { id });
  }

  getPhotos(): Promise<Photo[]> {
    return getRepository(Photo)
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .andWhere('user.firstName = :name', { name: 'Dai' })
      .getMany();
  }
}
