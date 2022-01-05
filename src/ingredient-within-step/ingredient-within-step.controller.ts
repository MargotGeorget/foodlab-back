import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientWithinStepService } from './ingredient-within-step.service';
import { CreateIngredientWithinStepDto } from './dto/create-ingredient-within-step.dto';
import { UpdateIngredientWithinStepDto } from './dto/update-ingredient-within-step.dto';
import {Recipe} from "../recipe/entities/recipe.entity";
import {RecipeService} from "../recipe/recipe.service";
import {Ingredient} from "../ingredient/entities/ingredient.entity";

@Controller('ingredient-within-step')
export class IngredientWithinStepController {
  constructor(
      private readonly ingredientWithinStepService: IngredientWithinStepService,
      private readonly recipeService: RecipeService
  ) {}

  @Post()
  create(@Body() createIngredientWithinStepDto: CreateIngredientWithinStepDto) {
    return this.ingredientWithinStepService.create(createIngredientWithinStepDto);
  }

  @Get()
  findAll() {
    return this.ingredientWithinStepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientWithinStepService.findOne(+id);
  }

  @Get('ingredients/:id')
  findAllIngredientsInStep(@Param('id') id: string) {
    return this.ingredientWithinStepService.findAllIngredientsInStep(+id);
  }

  @Get('ingredients-in-recipe/:id')
  async findAllIngredientsInRecipe(@Param('id') id: string) {
    let recipe = await this.recipeService.findOne(+id);
    let recipeExecutionId = recipe.recipeExecutionId;
    let ingredientsIterator = await this.ingredientWithinStepService.findAllIngredientsInRecipe(recipeExecutionId);
    let ingredients: Ingredient[] = [];
    for (let ingredient of ingredientsIterator) {
      ingredients.push(ingredient.ingredient);
    }
    return ingredients;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientWithinStepDto: UpdateIngredientWithinStepDto) {
    return this.ingredientWithinStepService.update(+id, updateIngredientWithinStepDto);
  }

  @Delete('delete-all-in-a-step/:id')
  removeAllIngredientWithinAStep(@Param('id') id: string) {
    return this.ingredientWithinStepService.removeAllIngredientWithinAStep(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientWithinStepService.remove(+id);
  }
}
