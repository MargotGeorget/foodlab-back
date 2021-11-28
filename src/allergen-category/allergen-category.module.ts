import { Module } from '@nestjs/common';
import { AllergenCategoryService } from './allergen-category.service';
import { AllergenCategoryController } from './allergen-category.controller';

@Module({
  controllers: [AllergenCategoryController],
  providers: [AllergenCategoryService]
})
export class AllergenCategoryModule {}
