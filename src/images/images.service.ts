import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { IMAGES_DIR } from 'src/constants';



@Injectable()
export class ImagesService {
    constructor() {
        if (! existsSync(IMAGES_DIR)) {
            mkdirSync(IMAGES_DIR, {recursive: true});
        }
    }

    getImageByImageName(imageName: string): StreamableFile {
        const file = createReadStream(join(IMAGES_DIR, imageName));

        return new StreamableFile(file);
    }
}
