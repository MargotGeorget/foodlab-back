import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { RecipeExecution } from '../../recipe-execution/entities/recipe-execution.entity';

@Entity()
export class IngredientWithinStep {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, ingredient => ingredient.steps)
  ingredient: Ingredient;

  @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.ingredients)
  recipeExecution: RecipeExecution;

}
