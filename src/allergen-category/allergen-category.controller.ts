import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllergenCategoryService } from './allergen-category.service';
import { CreateAllergenCategoryDto } from './dto/create-allergen-category.dto';
import { UpdateAllergenCategoryDto } from './dto/update-allergen-category.dto';

@Controller('allergen-category')
export class AllergenCategoryController {
  constructor(private readonly allergenCategoryService: AllergenCategoryService) {}

  @Post()
  create(@Body() createAllergenCategoryDto: CreateAllergenCategoryDto) {
    return this.allergenCategoryService.create(createAllergenCategoryDto);
  }

  @Get()
  findAll() {
    return this.allergenCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allergenCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAllergenCategoryDto: UpdateAllergenCategoryDto) {
    return this.allergenCategoryService.update(+id, updateAllergenCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.allergenCategoryService.remove(+id);
  }
}
