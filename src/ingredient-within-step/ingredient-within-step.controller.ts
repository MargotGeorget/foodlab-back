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
      private readonly ingredientWithinStepService: IngredientWithinStepService
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

  // @Get('ingredients/:id')
  // findAllIngredientsInStep(@Param('id') id: string) {
  //   return this.ingredientWithinStepService.findAllIngredientsInStep(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientWithinStepDto: UpdateIngredientWithinStepDto) {
    return this.ingredientWithinStepService.update(+id, updateIngredientWithinStepDto);
  }

  //TODO : déplacer
  @Delete('delete-all-in-a-step/:id')
  removeAllIngredientWithinAStep(@Param('id') id: string) {
    return this.ingredientWithinStepService.removeAllIngredientWithinAStep(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientWithinStepService.remove(+id);
  }
}
