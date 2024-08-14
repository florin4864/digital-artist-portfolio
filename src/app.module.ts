import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ItemsModule } from './items/items.module';
import { ImagesService } from './images/images.service';
import { ImagesController } from './images/images.controller';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DATA_DIR, PUBLIC_DIR, SECRET } from './constants';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
    imports: [
        ServeStaticModule.forRoot({
            serveRoot: '/public',
            rootPath: PUBLIC_DIR,
            exclude: ['/api/(.*)']
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: join(DATA_DIR, 'database.db'),
            keepConnectionAlive: true,
            entities: [join(__dirname, '**/*.entity{.ts,.js}')],
            // migrations: ['dist/db/migrations/*{.ts,.js}'],
            synchronize: true,
            logging: false,
        }),
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            secret: SECRET,
            signOptions: {
                expiresIn: '1d'
            }
        }),
        ItemsModule,
        ImagesModule,
        ConfigModule,
        AuthModule
    ],
    providers: [ImagesService],
    controllers: [AppController, ImagesController],
})
export class AppModule {}
