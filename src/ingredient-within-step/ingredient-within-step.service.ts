import { Injectable } from '@nestjs/common';
import { CreateIngredientWithinStepDto } from './dto/create-ingredient-within-step.dto';
import { UpdateIngredientWithinStepDto } from './dto/update-ingredient-within-step.dto';
import { IngredientWithinStep } from './entities/ingredient-within-step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';

@Injectable()
export class IngredientWithinStepService {
  constructor(
      @InjectRepository(IngredientWithinStep)
      private ingredientWithinStepRepository: Repository<IngredientWithinStep>
  ) {}

  create(createIngredientWithinStepDto: CreateIngredientWithinStepDto) {
    //'This action adds a new ingredientWithinStep'
    console.log(createIngredientWithinStepDto);
    return this.ingredientWithinStepRepository.save(createIngredientWithinStepDto);
  }

  findAll() {
    //`This action returns all ingredientWithinStep`
    return this.ingredientWithinStepRepository.find();
  }

  findOne(id: number) {
    //`This action returns a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.findOne({id: id});
  }

  findAllIngredientsInStep(id: number) {
    //`This action returns all the ingredients in a #${id} step`
    return this.ingredientWithinStepRepository.find({
      where: { recipeExecutionId: id },
      relations: ["ingredient","ingredient.ingredientCategory"]
    });
  }
  findAllIngredientsInStep2(id: number) {
    return this.ingredientWithinStepRepository.find({
      relations: ['ingredient'],
      where: { recipeExecutionId: id },
    });
  }


  update(id: number, updateIngredientWithinStepDto: UpdateIngredientWithinStepDto) {
    //`This action updates a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.update({id: id}, updateIngredientWithinStepDto);
  }

  removeAllIngredientWithinAStep(id: number){
    return this.ingredientWithinStepRepository.delete({recipeExecutionId: id});
  }

  remove(id: number) {
    //`This action removes a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.delete({id: id});
  }
}
