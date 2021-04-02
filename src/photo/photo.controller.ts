import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

import { CreatePhotoDto, EditPhotoDto } from './dtos';
import { PhotoService } from './photo.service';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { UserDto } from '@/user/dtos/user.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPhoto(
    @CurrentUser() user: UserDto,
    @Body() newPhoto: CreatePhotoDto,
  ) {
    return this.photoService.createPhoto(user.id, newPhoto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updatePhoto(@Body() editPhoto: EditPhotoDto) {
    return this.photoService.updatePhoto(editPhoto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPhotos() {
    return this.photoService.getPhotos();
  }
}
