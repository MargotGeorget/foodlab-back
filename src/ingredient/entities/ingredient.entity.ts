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

    @Column({ type: 'decimal', nullable: true })
    unitaryPrice: number

    @Column({ type: 'decimal', nullable: true })
    stockQuantity: number

    @Column()
    unit: string

    @Column()
    ingredientCategoryId: number

    @Column({ nullable: true })
    allergenCategoryId: number

    @OneToMany(() => IngredientWithinStep, ingredientWithinStep => ingredientWithinStep.ingredient)
    steps: IngredientWithinStep[];

    // Ingredient will have AllergenCategory's foreign key
    @ManyToOne(() => AllergenCategory, allergenCategory => allergenCategory.ingredients)
    @JoinColumn({name: "allergenCategoryId"})
    allergenCategory: AllergenCategory;

    @ManyToOne(() => IngredientCategory, ingredientCategory => ingredientCategory.ingredients)
    @JoinColumn({name: "ingredientCategoryId"})
    ingredientCategory: IngredientCategory;
}
