import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {Ingredient} from "./entities/ingredient.entity";

@Injectable()
export class IngredientService {
  create(createIngredientDto: CreateIngredientDto) {
    return 'This action adds a new ingredient';
  }

  findAll() {
    return new Ingredient("Daurade", 15, "KG");
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    return `This action updates a #${id} ingredient`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredient`;
  }
}