import { Injectable } from '@nestjs/common';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';
import { Repository } from 'typeorm';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';

@Injectable()
export class RecipeExecutionService {
  constructor(
    private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
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
      relations: ["ingredients"]
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} recipeExecution`
    return this.recipeExecutionRepository.findOne({id: id}, {
      relations: ["ingredients", "recipe"]
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

  async getAllStepsInRecipeExecution(id: number) {
    let steps: RecipeExecution[] = [];
    let stepsWithinRecipeExecution = await this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(id);
    for(let stepWithinRecipeExecution of stepsWithinRecipeExecution){
      steps.push(await this.findOne(stepWithinRecipeExecution.stepId));
    }
    return steps;
  }

  async getAllProgressionInRecipeExecution(id: number) {
    let progressions: RecipeExecution[] = [];
    let progressionsWithinRecipeExecution = await this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(id);
    for(let progressionWithinRecipeExecution of progressionsWithinRecipeExecution){
      progressions.push(await this.findOne(progressionWithinRecipeExecution.stepId));
    }
    return progressions;
  }

  //Retourne la durée complète de la recipe execution
  async getDuration(id: number) {
    let duration = 0;
    let steps = await this.getAllStepsInRecipeExecution(id);
    for(let step of steps){
      duration += step.duration;
    }
    let progressions = await this.getAllProgressionInRecipeExecution(id);
    for(let progression of progressions){
      duration += await this.getDuration(progression.id);
    }
    return duration;
  }
}
