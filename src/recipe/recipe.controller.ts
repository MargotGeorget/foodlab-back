import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { UpdateStepWithinRecipeExecutionDto } from '../step-within-recipe-execution/dto/update-step-within-recipe-execution.dto';
import { CreateCostDataDto } from '../cost-data/dto/create-cost-data.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  @Get('duration/:id')
  getDuration(@Param('id') id: string) {
    return this.recipeService.getRecipeDuration(+id);
  }

  @Get('ingredient-cost/:id')
  getCostIngredient(@Param('id') id: string) {
    return this.recipeService.getRecipeIngredientsTotalCost(+id);
  }

  @Get('ingredients-in-recipe/:id')
  async findAllIngredientsInRecipe(@Param('id') id: string) {
    return this.recipeService.findAllIngredientInRecipe(+id);
  }

  @Get('ingredients-within-step-in-recipe/:id')
  async findAllIngredientsWithinStepInRecipe(@Param('id') id: string) {
    return this.recipeService.findAllIngredientsWithinStepInRecipe(+id);
  }

  @Get('category/:id')
  findManyByCategory(@Param('id') id: string) {
    return this.recipeService.findManyByCategory(+id);
  }

  @Put('sell/:id')
  sellRecipe(@Param('id') id: string) {
    return this.recipeService.sellRecipe(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Patch('update-cost-data/:id')
  updateCostData(@Param('id') id: string, @Body() createCostDataDto: CreateCostDataDto) {
    return this.recipeService.updateCostData(+id, createCostDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
