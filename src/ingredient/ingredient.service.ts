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
    console.log(createIngredientDto.stockQuantity)
    return this.ingredientRepository.save(createIngredientDto);
  }

  findAll() {
    return this.ingredientRepository.find({
      relations : ["ingredientCategory","allergenCategory"]
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} ingredient`
    return this.ingredientRepository.findOne({id: id});
  }

  update(id: number, updateIngredientDto: UpdateIngredientDto) {
    //`This action updates a #${id} ingredient`
    return this.ingredientRepository.update({id: id}, updateIngredientDto);
  }

  remove(id: number) {
    return this.ingredientRepository.delete({id: id});
  }
}
