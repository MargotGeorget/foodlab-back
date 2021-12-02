import { Injectable } from '@nestjs/common';
import { CreateIngredientWithinStepDto } from './dto/create-ingredient-within-step.dto';
import { UpdateIngredientWithinStepDto } from './dto/update-ingredient-within-step.dto';
import { IngredientWithinStep } from './entities/ingredient-within-step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientWithinStepService {
  constructor(
    @InjectRepository(IngredientWithinStep)
      private IngredientWithinStepRepository: Repository<IngredientWithinStep>,
) {}
  create(createIngredientWithinStepDto: CreateIngredientWithinStepDto) {
    return 'This action adds a new ingredientWithinStep';
  }

  findAll() {
    return `This action returns all ingredientWithinStep`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredientWithinStep`;
  }

  update(id: number, updateIngredientWithinStepDto: UpdateIngredientWithinStepDto) {
    return `This action updates a #${id} ingredientWithinStep`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingredientWithinStep`;
  }
}
