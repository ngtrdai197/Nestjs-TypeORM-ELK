import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dtos/create-photo.dto';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
    constructor(@InjectRepository(Photo) private photoRepo: Repository<Photo>) { }

    create(newPhoto: CreatePhotoDto): Promise<Photo> {
        return this.photoRepo.save(newPhoto)
    }

    getPhotos(): Promise<Photo[]> {
        return this.photoRepo.createQueryBuilder('photo')
            .leftJoinAndSelect('photo.user', 'user', 'photo.user_id = user.id').getMany()
    }

}
