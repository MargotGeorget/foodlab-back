import { Injectable } from '@nestjs/common';
import { CreateIngredientWithinStepDto } from './dto/create-ingredient-within-step.dto';
import { UpdateIngredientWithinStepDto } from './dto/update-ingredient-within-step.dto';
import { IngredientWithinStep } from './entities/ingredient-within-step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';

@Injectable()
export class IngredientWithinStepService {
  constructor(
      private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
      @InjectRepository(IngredientWithinStep)
      private ingredientWithinStepRepository: Repository<IngredientWithinStep>
  ) {}

  create(createIngredientWithinStepDto: CreateIngredientWithinStepDto) {
    //'This action adds a new ingredientWithinStep'
    console.log(createIngredientWithinStepDto);
    return this.ingredientWithinStepRepository.save(createIngredientWithinStepDto);
  }

  findAll() {
    //`This action returns all ingredientWithinStep`
    return this.ingredientWithinStepRepository.find();
  }

  findOne(id: number) {
    //`This action returns a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.findOne({id: id});
  }

  findAllIngredientsInStep(id: number) {
    //`This action returns all the ingredients in a #${id} step`
    return this.ingredientWithinStepRepository.find({
      select: ["ingredient","quantity"],
      where: { recipeExecutionId: id },
      relations: ["ingredient","ingredient.ingredientCategory"]
    });
  }

  //idRecipeExecution : id de la progression que contient la recette
  async findAllIngredientsInRecipe(idRecipeExecution: number) {

    let ingredientsMap = new Map<number, IngredientWithinStep>();

    //On récupère toutes les étapes de la progression
    let steps = await this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(idRecipeExecution);

    //pour chaque étpaes on récupère tous ses ingrédients
    for (let step of steps) {
      let stepIngredients = await this.ingredientWithinStepRepository.find({
        relations: ['ingredient'],
        where: { recipeExecutionId: step.stepId },
      });

      // pour chaque ingrédient, on ajoute sa quantité à la map
      for (let ingredient of stepIngredients) {
        this.addIngredientToMap(ingredient, ingredientsMap);
      }
    }

    //on récupère toutes
    let recipeExecutions = await this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(idRecipeExecution);

    // Pour chaque progression on récupère ses ingrédients
    for (let recipeExecution of recipeExecutions) {
      let executionIngredients = await this.findAllIngredientsInRecipe(recipeExecution.stepId);

      // pour chaque ingrédient, on ajoute sa quantité à la map
      for (let ingredient of executionIngredients) {
        this.addIngredientToMap(ingredient, ingredientsMap);
      }
    }

    return ingredientsMap.values();
  }

  /**
   * Adds an ingredient's quantity to an ingredient map.
   *
   * @param ingredient
   * @param ingredientsMap
   * @private
   */
  private addIngredientToMap(ingredient: IngredientWithinStep, ingredientsMap: Map<number, IngredientWithinStep>) {
    let ingredientId = ingredient.id;
    if (ingredientsMap.has(ingredientId)) {
      // The map already contains this ingredient so we increment the ingredient's quantity
      let currentQuantity = ingredientsMap.get(ingredientId).quantity;
      let newQuantity = currentQuantity + ingredient.quantity;
      ingredientsMap.get(ingredientId).quantity = currentQuantity + newQuantity; // increments the ingredient's quantity
    } else {
      // The map doesn't contains this ingredient so wa add it
      ingredientsMap.set(ingredientId, ingredient);
    }
  }

  update(id: number, updateIngredientWithinStepDto: UpdateIngredientWithinStepDto) {
    //`This action updates a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.update({id: id}, updateIngredientWithinStepDto);
  }

  remove(id: number) {
    //`This action removes a #${id} ingredientWithinStep`
    return this.ingredientWithinStepRepository.delete({id: id});
  }
}
