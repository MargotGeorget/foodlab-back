import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Recipe} from "../../recipe/entities/recipe.entity";

@Entity()
export class CostData {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal'})
    averageHourlyCost: number;

    @Column({ type: 'decimal'})
    flatrateHourlyCost: number;

    @Column({ type: 'decimal'})
    coefWithCharges: number;

    @Column({ type: 'decimal'})
    coefWithoutCharges: number;

    @OneToMany(() => Recipe, recipe => recipe.costData)
    recipes: Recipe[];

}
