import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {RecipeExecution} from '../../recipe-execution/entities/recipe-execution.entity';
@Entity()
export class StepWithinRecipeExecution {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number

    @Column()
    recipeExecutionId: number

    @Column()
    stepId: number

    @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.steps)
    @JoinColumn({name: "recipeExecutionId"})
    recipeExecution: RecipeExecution;

    @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.recipeExecution)
    @JoinColumn({name: "stepId"})
    step: RecipeExecution;

}
