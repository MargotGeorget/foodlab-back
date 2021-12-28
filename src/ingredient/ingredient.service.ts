import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {Ingredient} from "./entities/ingredient.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientService {

  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  create(createIngredientDto: CreateIngredientDto) {
    return this.ingredientRepository.save(createIngredientDto);
  }

  findAll() {
    return this.ingredientRepository.find({
      relations : ["ingredientCategory","allergenCategory"]
    });
  }

  findOne(id: number) {
    return this.ingredientRepository.findOne({ id: id }, {
      relations: ["ingredientCategory","allergenCategory"]
    });
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return this.ingredientRepository.update({id: id}, updateIngredientDto);
  }

  remove(id: number) {
    return this.ingredientRepository.delete({id: id});
  }
}
