import { Injectable } from '@nestjs/common';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-category.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientCategory } from './entities/ingredient-category.entity';

@Injectable()
export class IngredientCategoryService {

  constructor(
    @InjectRepository(IngredientCategory)
    private ingredientCategoryRepository: Repository<IngredientCategory>,
  ) {}

  create(createIngredientCategoryDto: CreateIngredientCategoryDto) {
    return this.ingredientCategoryRepository.save(createIngredientCategoryDto);
  }

  findAll() {
    return this.ingredientCategoryRepository.find();
  }

  findOne(id: number) {
    return this.ingredientCategoryRepository.find({id: id});
  }

  update(id: number, updateIngredientCategoryDto: UpdateIngredientCategoryDto) {
    return this.ingredientCategoryRepository.update({id:id},updateIngredientCategoryDto);;
  }

  remove(id: number) {
    return this.ingredientCategoryRepository.delete({id:id});
  }
}
