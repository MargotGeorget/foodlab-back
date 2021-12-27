import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateIngredientCategoryDto } from './dto/create-ingredient-category.dto';
import { UpdateIngredientCategoryDto } from './dto/update-ingredient-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientCategory } from './entities/ingredient-category.entity';
import { Http2ServerRequest } from 'http2';

@Injectable()
export class IngredientCategoryService {

  constructor(
    @InjectRepository(IngredientCategory)
    private ingredientCategoryRepository: Repository<IngredientCategory>,
  ) {}

  create(createIngredientCategoryDto: CreateIngredientCategoryDto) {
    return this.ingredientCategoryRepository.save(createIngredientCategoryDto);
  }

  findAll() {
    return this.ingredientCategoryRepository.find();
  }

  findOne(id: number) {
    return this.ingredientCategoryRepository.find({id: id});
  }

  update(id: number, updateIngredientCategoryDto: UpdateIngredientCategoryDto) {
    return this.ingredientCategoryRepository.update({id:id},updateIngredientCategoryDto);;
  }

  async remove(id: number) {
    //Vérifier que la catégorie ne correspond pas à des ingrédients
    let res = await this.ingredientCategoryRepository.findOne({id: id},{relations : ["ingredients"]});
    if(res.ingredients.length>0){
      //des ingrédients correspondent à cette catégorie
      throw new HttpException({
        status : HttpStatus.CONFLICT,
        error: 'tu peux pas frero',
      }, HttpStatus.CONFLICT);
    } else {
      //on peut supprimer la catégorie
      return this.ingredientCategoryRepository.delete({id: id});
    }

  }
}
