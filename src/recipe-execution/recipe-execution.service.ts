import { Injectable } from '@nestjs/common';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeExecutionService {
  constructor(
    @InjectRepository(RecipeExecution)
      private recipeExecutionRepository: Repository<RecipeExecution>,
) {}

  create(createRecipeExecutionDto: CreateRecipeExecutionDto) {
    //'This action adds a new recipeExecution'
    return this.recipeExecutionRepository.save(createRecipeExecutionDto);
  }

  findAll() {
    `This action returns all recipeExecution`
    return this.recipeExecutionRepository.find({
      relations: ["ingredients","recipeExecution","steps"]
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} recipeExecution`
    return this.recipeExecutionRepository.findOne({id: id}, {
      relations: ["ingredients","recipeExecution","steps", "recipe"]
    });
  }


  findAllInRecipe(idRecipe: number) {
    //return this.recipeExecutionRepository.find({recipe: idRecipe});
  }

  update(id: number, updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    //`This action updates a #${id} recipeExecution`
    return this.recipeExecutionRepository.update({id: id}, updateRecipeExecutionDto);
  }

  remove(id: number) {
    //`This action removes a #${id} recipeExecution`
    return this.recipeExecutionRepository.delete({id: id});
  }
}
