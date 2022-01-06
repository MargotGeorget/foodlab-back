import {forwardRef, Module} from '@nestjs/common';
import { IngredientWithinStepService } from './ingredient-within-step.service';
import { IngredientWithinStepController } from './ingredient-within-step.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientWithinStep } from './entities/ingredient-within-step.entity';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';
import { StepWithinRecipeExecutionModule } from '../step-within-recipe-execution/step-within-recipe-execution.module';
import {RecipeModule} from "../recipe/recipe.module";

@Module({
  imports: [TypeOrmModule.forFeature([IngredientWithinStep])],
  controllers: [IngredientWithinStepController],
  providers: [IngredientWithinStepService],
  exports: [IngredientWithinStepService]
})
export class IngredientWithinStepModule {
}
