import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { IngredientWithinStepService } from '../ingredient-within-step/ingredient-within-step.service';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';
import { RecipeExecution } from '../recipe-execution/entities/recipe-execution.entity';
import { RecipeExecutionService } from '../recipe-execution/recipe-execution.service';

@Injectable()
export class RecipeService {

  constructor(
    private ingredientService: IngredientService,
    private ingredientWithinStepService: IngredientWithinStepService,
    private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
    private recipeExecutionService: RecipeExecutionService,
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

  findManyByCategory(idCategory: number){
    return this.recipeRepository.find({
      relations: ["recipeCategory"],
      where : { recipeCategoryId : idCategory }
    })
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

  async sellRecipe(idRecipe: number){
    //TODO: add verif recipe empty
    let recipe = await this.findOne(idRecipe);

    //on récupère tout les ingrédients de la recette
    let ingredients = await this.ingredientWithinStepService.findAllIngredientsInRecipe(recipe.recipeExecutionId );
    for (let ingredient of ingredients){
      if(ingredient.quantity > ingredient.ingredient.stockQuantity){
        //la quantité en stock de l'ingrédient n'est pas suffisante, on ne peut pas vendre la recette
        throw new HttpException({
          status : HttpStatus.CONFLICT,
          error: 'Insufficient  quantity in stock ',
        }, HttpStatus.CONFLICT);
        return false;
      }
      else {
        //on diminue la quantité en stock
        ingredient.ingredient.stockQuantity = ingredient.ingredient.stockQuantity - ingredient.quantity;
      }
    }
    //si on arrive ici sans avoir levé d'erreur Http alors la recette peut être vendu
    //on actualise alors le stock des ingrédients dans la base de données
    for (let ingredient of ingredients){
      await this.ingredientService.update(ingredient.ingredientId, ingredient.ingredient);
    }
    return true;
  }

  //-------------- Management cost --------------
  async getCostIngredient(id: number) {
    let recipe = await this.findOne(id);
    let ingredients = await this.ingredientWithinStepService.findAllIngredientsInRecipe(recipe.recipeExecutionId);
    let cost = 0;
    for(let ingredient of ingredients){
      cost += ingredient.quantity * ingredient.ingredient.unitaryPrice;
    }
    return cost;
  }

  async getDuration(id: number) {
    let recipe = await this.findOne(id);
    if(recipe) {
      return this.recipeExecutionService.getDuration(recipe.recipeExecutionId);
    }else{
      throw new HttpException({
        status : HttpStatus.NOT_FOUND,
        error: 'No recipe found',
      }, HttpStatus.NOT_FOUND);
    }
  }
}
