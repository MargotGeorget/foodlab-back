import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeExecutionService } from './recipe-execution.service';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    return this.recipeExecutionService.update(+id, updateRecipeExecutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeExecutionService.remove(+id);
  }
}
