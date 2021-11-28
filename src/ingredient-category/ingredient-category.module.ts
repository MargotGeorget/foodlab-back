import { Module } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient-category.service';
import { IngredientCategoryController } from './ingredient-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientCategory } from './entities/ingredient-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientCategory])],
  controllers: [IngredientCategoryController],
  providers: [IngredientCategoryService]
})
export class IngredientCategoryModule {}
