import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Recipe} from "../../recipe/entities/recipe.entity";

@Entity()
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
