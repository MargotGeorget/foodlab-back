import { Injectable } from '@nestjs/common';
import { CreateAllergenCategoryDto } from './dto/create-allergen-category.dto';
import { UpdateAllergenCategoryDto } from './dto/update-allergen-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllergenCategory } from './entities/allergen-category.entity';

@Injectable()
export class AllergenCategoryService {

  constructor(
    @InjectRepository(AllergenCategory)
    private allergenCategoryRepository: Repository<AllergenCategory>,
  ) {}

  create(createAllergenCategoryDto: CreateAllergenCategoryDto) {
    return this.allergenCategoryRepository.save(createAllergenCategoryDto);
  }

  findAll() {
    return this.allergenCategoryRepository.find();
  }

  findOne(id: number) {
    return this.allergenCategoryRepository.find({id: id});
  }

  update(id: number, updateIngredientCategoryDto: UpdateAllergenCategoryDto) {
    return this.allergenCategoryRepository.update({id:id},UpdateAllergenCategoryDto);;
  }

  remove(id: number) {
    return this.allergenCategoryRepository.delete({id:id});
  }

}
