import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientWithinStep } from '../../ingredient-within-step/entities/ingredient-within-step.entity';

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

    @OneToMany(() => IngredientWithinStep, ingredientWithinStep => ingredientWithinStep.ingredient)
    steps: IngredientWithinStep[];


}
