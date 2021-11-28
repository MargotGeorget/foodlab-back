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
    return this.ingredientRepository.save(new Ingredient("Test", 15, "KG"));
  }

  findAll() {
    return this.ingredientRepository.find({});
   // return new Ingredient("Daurade", 15, "KG");
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return this.ingredientRepository.delete({id: id});
  }
}
