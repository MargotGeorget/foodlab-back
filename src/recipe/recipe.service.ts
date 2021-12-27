import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {

  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    //This action adds a new recipe
    console.log(createRecipeDto)
    return this.recipeRepository.save(createRecipeDto);
  }

  findAll() {
    //`This action returns all recipe`
    return this.recipeRepository.find({
      relations: ["recipeExecution","recipeCategory"]
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} recipe`
    return this.recipeRepository.findOne({id: id},{
        relations: ["recipeExecution","recipeCategory"]
      });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    //`This action updates a #${id} recipe`
    console.log(updateRecipeDto)
    return this.recipeRepository.update({id: id}, updateRecipeDto) ;
  }

  remove(id: number) {
    //`This action removes a #${id} recipe`
    return this.recipeRepository.delete({id: id});
  }
}
