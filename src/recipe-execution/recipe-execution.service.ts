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
      private RecipeExecutionRepository: Repository<RecipeExecution>,
) {}

  create(createRecipeExecutionDto: CreateRecipeExecutionDto) {
    return 'This action adds a new recipeExecution';
  }

  findAll() {
    return `This action returns all recipeExecution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipeExecution`;
  }

  update(id: number, updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    return `This action updates a #${id} recipeExecution`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipeExecution`;
  }
}
