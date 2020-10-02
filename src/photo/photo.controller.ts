import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePhotoDto } from './dtos/create-photo.dto';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) { }

    @Post()
    async createPhoto(@Body() newPhoto: CreatePhotoDto) {
        return this.photoService.create(newPhoto)
    }

    @Get()
    async getPhotos() {
        return this.photoService.getPhotos()
    }
}
