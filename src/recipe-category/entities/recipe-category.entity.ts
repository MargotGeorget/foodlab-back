import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Recipe} from "../../recipe/entities/recipe.entity";

@Entity()
export class RecipeCategory {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Recipe, recipe => recipe.recipeCategory)
    recipes: Recipe[];
}
