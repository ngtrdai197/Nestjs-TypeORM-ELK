import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { CreatePhotoDto, EditPhotoDto } from './dtos';
import { PhotoService } from './photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  async createPhoto(@Body() newPhoto: CreatePhotoDto) {
    return this.photoService.createPhoto(newPhoto);
  }

  @Put()
  async updatePhoto(@Body() editPhoto: EditPhotoDto) {
    return this.photoService.updatePhoto(editPhoto);
  }

  @Get()
  async getPhotos() {
    return this.photoService.getPhotos();
  }
}
