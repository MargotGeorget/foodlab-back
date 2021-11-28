import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string
    @Column()
    unitaryPrice: number
    @Column()
    unit: string

    constructor(name: string, unitaryPrice: number, unit: string) {
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
    }
}
