import { Module } from '@nestjs/common';
import { AllergenCategoryService } from './allergen-category.service';
import { AllergenCategoryController } from './allergen-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergenCategory } from './entities/allergen-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AllergenCategory])],
  controllers: [AllergenCategoryController],
  providers: [AllergenCategoryService]
})
export class AllergenCategoryModule {}
