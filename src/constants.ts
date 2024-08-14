import * as dotenv from 'dotenv';
import { join } from "path";



// NOTES:
//  - Initialize dotenv config before other modules are registered
//  - `@nestjs/config` doesn't initialize dotenv on time
dotenv.config();



export const DATA_DIR = join(__dirname, '..', process.env.DATA_DIR);
export const THUMBNAILS_DIR = join(__dirname, '..', process.env.DATA_DIR, 'thumbnails');
export const IMAGES_DIR = join(__dirname, '..', process.env.DATA_DIR, 'images');
export const PUBLIC_DIR = join(__dirname, '../public');
export const SECRET = process.env.SECRET ? process.env.SECRET : require('crypto').randomBytes(48).toString('hex');
