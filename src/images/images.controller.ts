import { ImagesService } from './images.service';
import { Controller, Get, Param } from '@nestjs/common';



@Controller('/api/images')
export class ImagesController {
    constructor(
        private readonly imagesService: ImagesService
    ) {}

    @Get(':imageName')
    async getByImageName(@Param('imageName') imageName: string) {
        return this.imagesService.getImageByImageName(imageName);
    }
}
