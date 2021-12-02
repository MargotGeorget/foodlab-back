import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeExecution } from '../../recipe-execution/entities/recipe-execution.entity';

@Entity()
export class StepWithinRecipeExecution {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number

  @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.steps)
  recipeExecution: RecipeExecution;

  @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.recipeExecution)
  step: RecipeExecution;

}
