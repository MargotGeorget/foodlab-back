import { Injectable } from '@nestjs/common';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-category.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-category.dto';

@Injectable()
export class IngredientCategoryService {
  create(createIngredientCategoryDto: CreateIngredientCategoryDto) {
    return 'This action adds a new ingredientCategory';
  }

  findAll() {
    return `This action returns all ingredientCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientCategory`;
  }

  update(id: number, updateIngredientCategoryDto: UpdateIngredientCategoryDto) {
    return `This action updates a #${id} ingredientCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientCategory`;
  }
}
