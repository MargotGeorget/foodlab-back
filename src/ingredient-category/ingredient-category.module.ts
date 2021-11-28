import { Module } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient-category.service';
import { IngredientCategoryController } from './ingredient-category.controller';

@Module({
  controllers: [IngredientCategoryController],
  providers: [IngredientCategoryService]
})
export class IngredientCategoryModule {}
