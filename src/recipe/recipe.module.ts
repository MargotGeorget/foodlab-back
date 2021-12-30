import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { IngredientModule } from '../ingredient/ingredient.module';
import { IngredientWithinStepModule } from '../ingredient-within-step/ingredient-within-step.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]),
    IngredientModule,
    IngredientWithinStepModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {
}
