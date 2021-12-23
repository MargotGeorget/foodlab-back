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

    @Column()
    recipeCategoryId: number

    @Column({nullable: true})
    recipeExecutionId: number

    @Column({nullable: true})
    costDataId: number

    // one Recipe related to one RecipeExecution
    @OneToOne(() => RecipeExecution, recipeExecution => recipeExecution.recipe)
    @JoinColumn({name : "recipeExecutionId"}) // Recipe will have RecipeExecution foreign key
    recipeExecution: RecipeExecution;

    // many Recipes related to one RecipeCategory
    @ManyToOne(() => RecipeCategory, recipeCategory => recipeCategory.recipes)
    @JoinColumn({name: "recipeCategoryId"})
    recipeCategory: RecipeCategory;
    /*
    Recipe will have RecipeCategory's foreign key
    @JoinColumn is not necessary in this type of relation
    */

    // many Recipes related to one CostData
    @ManyToOne(() => CostData, costData => costData.recipes)
    @JoinColumn({name: "costDataId"})
    costData: CostData;
}
