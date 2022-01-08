import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from '../../ingredient/entities/ingredient.entity';
import { RecipeExecution } from '../../recipe-execution/entities/recipe-execution.entity';

@Entity()
export class IngredientWithinStep {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredientId: number

  @Column()
  recipeExecutionId: number

  @Column({ type: 'decimal', nullable: true})
  quantity: number

  @ManyToOne(() => Ingredient, ingredient => ingredient.steps)
  @JoinColumn({ name: "ingredientId"})
  ingredient: Ingredient;

  @ManyToOne(() => RecipeExecution, recipeExecution => recipeExecution.ingredients)
  @JoinColumn({ name: "recipeExecutionId"})
  recipeExecution: RecipeExecution;

}
