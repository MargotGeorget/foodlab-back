import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeExecutionService } from './recipe-execution.service';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';
import { UpdateStepWithinRecipeExecutionDto } from '../step-within-recipe-execution/dto/update-step-within-recipe-execution.dto';

@Controller('recipe-execution')
export class RecipeExecutionController {
  constructor(private readonly recipeExecutionService: RecipeExecutionService) {}

  @Post()
  create(@Body() createRecipeExecutionDto: CreateRecipeExecutionDto) {
    return this.recipeExecutionService.create(createRecipeExecutionDto);
  }

  @Get()
  findAll() {
    return this.recipeExecutionService.findAll();
  }

  @Get('progressions')
  findAllProgressions() {
    return this.recipeExecutionService.getAllProgression();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeExecutionService.findOne(+id);
  }

  @Get('recipe/:id')
  findAllInRecipe(@Param('id') id: string) {
    return this.recipeExecutionService.findAllInRecipe(+id);
  }

  //-------------- Structure refactoring --------------
  @Patch('update-steps-order')
  updateStepsOrderOfRecipeExecution(@Body() updateStepsWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto[]){
    return this.recipeExecutionService.updateStepsOrderOfRecipeExecution(updateStepsWithinRecipeExecutionDto);
  }
  //-------------- End of structure refactoring --------------

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    return this.recipeExecutionService.update(+id, updateRecipeExecutionDto);
  }

  //TODO : renommer parce que on utilise différente fonciton remove pour simple step et recipeExecution
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeExecutionService.removeSimpleStep(+id);
  }

  @Delete('remove-step-within-recipe-execution/:id')
  removeStepWithinRecipeExecution(@Param('id') id: string) {
    return this.recipeExecutionService.removeStepWithinRecipeExecution(+id);
  }

  //-------------- Structure refactoring --------------
  @Get('all-simple-steps/:id')
  findAllSimpleStepInRecipeExecution(@Param('id') id: string) {
     return this.recipeExecutionService.findAllSimpleStepInRecipeExecution(+id);
  }

  @Get('all-steps/:id')
  findAllStepInRecipeExecution(@Param('id') id: string) {
    return this.recipeExecutionService.findAllStepInRecipeExecution(+id);
  }

  @Get('all-recipe-executions/:id')
  findAllProgressionInRecipeExecution(@Param('id') id: string) {
    return this.recipeExecutionService.findAllProgressionInRecipeExecution(+id);
  }

  @Get('all-ingredients-within-a-step-in-simple-step/:id')
  findAllIngredientsWithinAStepInSimpleStep(@Param('id') id: string) {
    return this.recipeExecutionService.findAllIngredientsWithinAStepInSimpleStep(+id);
  }

  @Get('all-ingredients-within-a-step-in-simple-steps-in-recipe-execution/:id')
  findAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(@Param('id') id: string) {
    return this.recipeExecutionService.findAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(+id);
  }



}
