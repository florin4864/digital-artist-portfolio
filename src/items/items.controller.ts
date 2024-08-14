import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IMAGES_DIR } from 'src/constants';



@Controller('/api/items')
export class ItemsController {
    constructor(
        private readonly itemsService: ItemsService
    ) {}

    @Get()
    async getAll() {
        return this.itemsService.getAll();
    }

    @Get(':title')
    async get(@Param('title') title: string) {
        return this.itemsService.get(title);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: IMAGES_DIR,
            filename: (req, file, callback) => {
                // const name = file.originalname.split('.')[0];
                // const extension = extname(file.originalname);
                // const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                // callback(null, `${name}-${randomName}${extension}`);
                // callback(null, createHash('sha256').update(file.originalname).digest('hex'));
                callback(null, file.originalname);
            }
        })
    }))
    @Post()
    async post(
        @UploadedFile() file: Express.Multer.File,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('clientLink') clientLink: string,
        @Body('isPrivate') isPrivate: boolean
    ) {
        return this.itemsService.create(
            title,
            file.filename,
            description,
            clientLink,
            isPrivate
        );
    }

    @UseGuards(AuthGuard)
    @Put(':title')
    async put(
        @Param('title') title: string,
        @Body('title') newTitle: string,
        @Body('description') description: string,
        @Body('clientLink') clientLink: string,
        @Body('isPrivate') isPrivate: boolean
    ) {
        return this.itemsService.update(
            title,
            newTitle,
            description,
            clientLink,
            isPrivate
        );
    }

    @UseGuards(AuthGuard)
    @Delete(':title')
    async delete(@Param('title') title: string) {
        return this.itemsService.delete(title);
    }
}
