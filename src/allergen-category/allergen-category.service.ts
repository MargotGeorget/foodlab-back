import { Injectable } from '@nestjs/common';
import { CreateAllergenCategoryDto } from './dto/create-allergen-category.dto';
import { UpdateAllergenCategoryDto } from './dto/update-allergen-category.dto';

@Injectable()
export class AllergenCategoryService {
  create(createAllergenCategoryDto: CreateAllergenCategoryDto) {
    return 'This action adds a new allergenCategory';
  }

  findAll() {
    return `This action returns all allergenCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} allergenCategory`;
  }

  update(id: number, updateAllergenCategoryDto: UpdateAllergenCategoryDto) {
    return `This action updates a #${id} allergenCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} allergenCategory`;
  }
}
