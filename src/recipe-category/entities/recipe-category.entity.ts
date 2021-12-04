import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RecipeCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
}
