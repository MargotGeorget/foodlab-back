import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeExecutionService } from '../recipe-execution/recipe-execution.service';
import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { IngredientWithinStep } from '../ingredient-within-step/entities/ingredient-within-step.entity';
import { CostDataService } from '../cost-data/cost-data.service';
import { CreateCostDataDto } from '../cost-data/dto/create-cost-data.dto';
import { UpdateCostDataDto } from '../cost-data/dto/update-cost-data.dto';

@Injectable()
export class RecipeService {

  constructor(
    private ingredientService: IngredientService,
    private recipeExecutionService: RecipeExecutionService,
    private costDataService: CostDataService,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    //This action adds a new recipe
    console.log(createRecipeDto)
    return this.recipeRepository.save({
      name: createRecipeDto.name,
      author: createRecipeDto.author,
      guestsNumber: createRecipeDto.guestsNumber,
      recipeCategoryId: createRecipeDto.recipeCategoryId,
      costDataId: 1 });
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

  async findAllIngredientInRecipe(recipeId: number){
    let recipe = await this.findOne(recipeId);
    let ingredientsIterator = await this.recipeExecutionService.findAllIngredientsInRecipeExecution(recipe.recipeExecutionId);
    let ingredients: Ingredient[] = [];
    for (let ingredient of ingredientsIterator) {
      ingredients.push(ingredient.ingredient);
    }
    return ingredients;
  }

  async findAllIngredientsWithinStepInRecipe(recipeId: number){
    let recipe = await this.findOne(recipeId);
    let ingredientsIterator = await this.recipeExecutionService.findAllIngredientsInRecipeExecution(recipe.recipeExecutionId);
    let ingredientsWithinStep: IngredientWithinStep[] = [];
    for (let ingredient of ingredientsIterator) {
      ingredientsWithinStep.push(ingredient);
    }
    return ingredientsWithinStep;
  }

  async findAllSimpleStepsInRecipe(recipeId: number){
    let recipe = await this.findOne(recipeId);
    return this.recipeExecutionService.findAllSimpleStepInRecipeExecution(recipe.recipeExecutionId);
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    //`This action updates a #${id} recipe`
    return this.recipeRepository.update({id: id}, updateRecipeDto) ;
  }

  async updateCostData(recipeId: number, createCostDataDto: CreateCostDataDto) {
    let recipe = await this.findOne(recipeId);
    if(recipe.costDataId == 1){
      let costData = await this.costDataService.create(createCostDataDto);
      await this.recipeRepository.update({id: recipeId}, {costDataId: costData.id});
    } else {
      await this.costDataService.update(recipe.costDataId, createCostDataDto);
    }

  }

  async remove(recipeId: number) {
    //`This action removes a #${id} recipe`
    let recipe = await this.findOne(recipeId);
    console.log(recipe);

    //vérifier que cette recette ne se trouve pas dans une autre recette
    if(await this.recipeExecutionService.isUsedInOtherRecipeExecution(recipe.recipeExecutionId)){
      throw new HttpException({
        status : HttpStatus.CONFLICT,
        error: 'You cannot delete this recipe, its recipe execution is used in other recipes',
      }, HttpStatus.CONFLICT);
    } else {
      //il faut supprimer sa recipe execution
      await this.recipeRepository.delete({ id: recipeId });
      await this.recipeExecutionService.removeRecipeExecution(recipe.recipeExecutionId);
    }
  }

  async sellRecipe(recipeId: number) {
    //on récupère tout les ingrédients de la recette
    let ingredientsWithinStep = await this.findAllIngredientsWithinStepInRecipe(recipeId);
    for (let ingredient of ingredientsWithinStep){
      const quantity = Number(ingredient.quantity);
      const stockQuantity = Number(ingredient.ingredient.stockQuantity);
      if(quantity > stockQuantity) {
        //la quantité en stock de l'ingrédient n'est pas suffisante, on ne peut pas vendre la recette
        throw new HttpException({
          status : HttpStatus.CONFLICT,
          error: 'Insufficient  quantity in stock',
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
    for (let ingredient of ingredientsWithinStep){
      //await this.ingredientService.update(ingredient.ingredientId, ingredient.ingredient);
      await this.ingredientService.updateQuantity(ingredient.ingredientId, ingredient.ingredient)
    }
    return true;
  }


  //-------------- Management cost --------------
  async getRecipeIngredientsTotalCost(recipeId: number) {
    let cost = 0;
    let ingredients = await this.findAllIngredientsWithinStepInRecipe(recipeId);
    for (let ingredient of ingredients) {
      cost += ingredient.quantity * ingredient.ingredient.unitaryPrice;
    }
    return cost;
  }

  getRecipeChargesCost(recipeId: number) {

  }

  async getRecipeDuration(id: number) {
    let recipe = await this.findOne(id);
    if(recipe) {
      return this.recipeExecutionService.getRecipeExecutionDuration(recipe.recipeExecutionId);
    }else{
      throw new HttpException({
        status : HttpStatus.NOT_FOUND,
        error: 'No recipe found',
      }, HttpStatus.NOT_FOUND);
    }
  }
}
