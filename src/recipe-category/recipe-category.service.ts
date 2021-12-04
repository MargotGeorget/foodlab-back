import { Injectable } from '@nestjs/common';
import { CreateRecipeCategoryDto } from './dto/create-recipe-category.dto';
import { UpdateRecipeCategoryDto } from './dto/update-recipe-category.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {RecipeCategory} from "./entities/recipe-category.entity";
import {Repository} from "typeorm";

@Injectable()
export class RecipeCategoryService {

  constructor(
      @InjectRepository(RecipeCategory)
      private recipeCategoryRepository: Repository<RecipeCategory>
  ) {}

  create(createRecipeCategoryDto: CreateRecipeCategoryDto) {
    return this.recipeCategoryRepository.save(createRecipeCategoryDto);
  }

  findAll() {
    return this.recipeCategoryRepository.find();
  }

  findOne(id: number) {
    return this.recipeCategoryRepository.findOne({id: id});
  }

  update(id: number, updateRecipeCategoryDto: UpdateRecipeCategoryDto) {
    return this.recipeCategoryRepository.update({id: id}, updateRecipeCategoryDto);
  }

  remove(id: number) {
    return this.recipeCategoryRepository.delete({id: id});
  }
}
