import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { IngredientModule } from '../ingredient/ingredient.module';
import { IngredientWithinStepModule } from '../ingredient-within-step/ingredient-within-step.module';
import { StepWithinRecipeExecutionModule } from '../step-within-recipe-execution/step-within-recipe-execution.module';
import { RecipeExecutionModule } from '../recipe-execution/recipe-execution.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]),
    IngredientModule,
    IngredientWithinStepModule,
    StepWithinRecipeExecutionModule,
    RecipeExecutionModule
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {
}
