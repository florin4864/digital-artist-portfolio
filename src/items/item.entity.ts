import { Column, Entity, PrimaryColumn } from "typeorm";



@Entity()
export class Item {
    @PrimaryColumn({unique: true})
    title: string;

    @Column()
    imageName: string

    @Column()
    description: string;

    @Column()
    clientLink: string;

    @Column({default: true})
    isPrivate: boolean;
}
