import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import { IngredientWithinStep } from '../../ingredient-within-step/entities/ingredient-within-step.entity';
import { StepWithinRecipeExecution } from '../../step-within-recipe-execution/entities/step-within-recipe-execution.entity';
import {Recipe} from "../../recipe/entities/recipe.entity";

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

  @OneToOne(() => Recipe, recipe => recipe.recipeExecution)
  recipe: number;

  @OneToMany(() => IngredientWithinStep, ingredientWithinStep => ingredientWithinStep.recipeExecution)
  ingredients: IngredientWithinStep[];

  @OneToMany(() => StepWithinRecipeExecution, stepWithinRecipeExecution => stepWithinRecipeExecution.step)
  recipeExecution: StepWithinRecipeExecution[]; //recipeExecution in which it is found

  @OneToMany(() => StepWithinRecipeExecution, stepWithinRecipeExecution => stepWithinRecipeExecution.recipeExecution)
  steps: StepWithinRecipeExecution[]; //if isStep == false, it's a 'Progression' and it can have many different steps

}
