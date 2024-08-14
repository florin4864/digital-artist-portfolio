import { Column, Entity, PrimaryColumn } from "typeorm";



@Entity()
export class User {
    @PrimaryColumn({unique: true})
    email: string;

    @Column()
    password: string;
}
