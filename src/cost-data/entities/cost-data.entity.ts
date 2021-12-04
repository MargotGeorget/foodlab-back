import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Recipe} from "../../recipe/entities/recipe.entity";

export class CostData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    averageHourlyCost: number;

    @Column()
    flatrateHourlyCost: number;

    @Column()
    coefWithCharges: number;

    @Column()
    coefWithoutCharges: number;

    @OneToMany(() => Recipe, recipe => recipe.costData)
    recipes: Recipe[];

}
