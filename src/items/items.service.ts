import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { rm } from 'fs';
import { IMAGES_DIR } from 'src/constants';
import { join } from 'path';



@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private itemRepository: Repository<Item>
    ) {}

    getAll() {
        return this.itemRepository.find();
    }

    get(title: string) {
        return this.itemRepository.findOneBy({title: title});
    }

    create(title: string, imageName: string, description: string, clientLink: string, isPrivate: boolean) {
        const item = new Item();
        item.title = title;
        item.imageName = imageName;
        item.description = description;
        item.clientLink = clientLink;
        item.isPrivate = isPrivate;

        return this.itemRepository.save(item);
    }

    async delete(title: string) {
        const item = await this.get(title);
        rm(join(IMAGES_DIR, item.imageName), () => {});

        return this.itemRepository.delete(title);
    }

    async update(title: string, newTitle: string, description: string, clientLink: string, isPrivate: boolean) {
        const oldItem = await this.itemRepository.findOne({where: {title: title}});
        if (! oldItem) {
            return null;
        }

        const newItem = new Item();
        newItem.title = newTitle;
        newItem.imageName = oldItem.imageName;
        newItem.description = description;
        newItem.clientLink = clientLink;
        newItem.isPrivate = isPrivate;

        return this.itemRepository.update(title, newItem);
    }
}
