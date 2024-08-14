import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { JwtService } from '@nestjs/jwt';



@Module({
    controllers: [ImagesController],
    providers: [ImagesService, JwtService]
})
export class ImagesModule {}
