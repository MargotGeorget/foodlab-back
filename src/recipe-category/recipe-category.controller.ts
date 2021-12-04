import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeCategoryService } from './recipe-category.service';
import { CreateRecipeCategoryDto } from './dto/create-recipe-category.dto';
import { UpdateRecipeCategoryDto } from './dto/update-recipe-category.dto';

@Controller('recipe-category')
export class RecipeCategoryController {

  constructor(private readonly recipeCategoryService: RecipeCategoryService) {
  }

  @Post()
  create(@Body() createRecipeCategoryDto: CreateRecipeCategoryDto) {
    return this.recipeCategoryService.create(createRecipeCategoryDto);
  }

  @Get()
  findAll() {
    return this.recipeCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeCategoryDto: UpdateRecipeCategoryDto) {
    return this.recipeCategoryService.update(+id, updateRecipeCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeCategoryService.remove(+id);
  }
}
