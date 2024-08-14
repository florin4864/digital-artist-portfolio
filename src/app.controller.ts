import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { PUBLIC_DIR } from './constants';



@Controller()
export class AppController {
    @Get()
    async index(@Res() res: Response) {
        res.sendFile(join(PUBLIC_DIR, 'index.html'));
    }
}
