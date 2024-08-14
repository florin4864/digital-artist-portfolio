import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { Item } from './item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { JwtService } from '@nestjs/jwt';



@Module({
    imports: [TypeOrmModule.forFeature([Item])],
    controllers: [ItemsController],
    providers: [ItemsService, JwtService]
})
export class ItemsModule {}
