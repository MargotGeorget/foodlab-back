import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngredientCategoryService } from './ingredient-category.service';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-category.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-category.dto';

@Controller('ingredient-category')
export class IngredientCategoryController {
  constructor(private readonly ingredientCategoryService: IngredientCategoryService) {}

  @Post()
  create(@Body() createIngredientCategoryDto: CreateIngredientCategoryDto) {
    return this.ingredientCategoryService.create(createIngredientCategoryDto);
  }

  @Get()
  findAll() {
    return this.ingredientCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngredientCategoryDto: UpdateIngredientCategoryDto) {
    return this.ingredientCategoryService.update(+id, updateIngredientCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientCategoryService.remove(+id);
  }
}
