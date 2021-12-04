import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IngredientWithinStep } from '../../ingredient-within-step/entities/ingredient-within-step.entity';
import { StepWithinRecipeExecution } from '../../step-within-recipe-execution/entities/step-within-recipe-execution.entity';

@Entity()
export class RecipeExecution {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isStep: boolean;

  @Column()
  stepTitle: string;

  @Column()
  stepDescription: string;

  @Column()
  duration: number;

  @OneToMany(() => IngredientWithinStep, ingredientWithinStep => ingredientWithinStep.recipeExecution)
  ingredients: IngredientWithinStep[];

  @OneToMany(() => StepWithinRecipeExecution, stepWithinRecipeExecution => stepWithinRecipeExecution.step)
  recipeExecution: StepWithinRecipeExecution[]; //recipeExecution in which it is found

  @OneToMany(() => StepWithinRecipeExecution, stepWithinRecipeExecution => stepWithinRecipeExecution.recipeExecution)
  steps: StepWithinRecipeExecution[]; //if isStep == false, so it's a 'Progression' and it can have many differents steps

}
