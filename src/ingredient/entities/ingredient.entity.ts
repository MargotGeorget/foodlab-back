import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientWithinStep } from '../../ingredient-within-step/entities/ingredient-within-step.entity';
import {AllergenCategory} from "../../allergen-category/entities/allergen-category.entity";
import {IngredientCategory} from "../../ingredient-category/entities/ingredient-category.entity";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    unitaryPrice: number

    @Column()
    stockQuantity: number

    @Column()
    unit: string

    @Column()
    ingredientCategoryId: number

    @OneToMany(() => IngredientWithinStep, ingredientWithinStep => ingredientWithinStep.ingredient)
    steps: IngredientWithinStep[];

    // Ingredient will have AllergenCategory's foreign key
    @ManyToOne(() => AllergenCategory, allergenCategory => allergenCategory.ingredients)
    allergenCategory: AllergenCategory;

    @ManyToOne(() => IngredientCategory, ingredientCategory => ingredientCategory.ingredients)
    @JoinColumn({name: "ingredientCategoryId"})
    ingredientCategory: IngredientCategory;
}
