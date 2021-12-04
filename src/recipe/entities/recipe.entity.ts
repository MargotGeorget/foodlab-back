import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RecipeExecution} from "../../recipe-execution/entities/recipe-execution.entity";
import {RecipeCategory} from "../../recipe-category/entities/recipe-category.entity";
import {CostData} from "../../cost-data/entities/cost-data.entity";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    guestsNumber: number;

    // one Recipe related to one RecipeExecution
    @OneToOne(() => RecipeExecution, recipeExecution => recipeExecution.recipe)
    @JoinColumn() // Recipe will have RecipeExecution foreign key
    recipeExecution: number;

    // many Recipes related to one RecipeCategory
    @ManyToOne(() => RecipeCategory, recipeCategory => recipeCategory.recipe)
    recipeCategory: number;
    /*
    Recipe will have RecipeCategory's foreign key
    @JoinColumn is not necessary in this type of relation
    */

    // many Recipes related to one CostData
    @ManyToOne(() => CostData, costData => costData.recipe)
    costData: number;
}