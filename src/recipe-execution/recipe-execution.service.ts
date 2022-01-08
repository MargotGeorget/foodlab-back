import { Body, Injectable } from '@nestjs/common';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';
import { Repository } from 'typeorm';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';
import { IngredientWithinStepService } from '../ingredient-within-step/ingredient-within-step.service';
import { IngredientWithinStep } from '../ingredient-within-step/entities/ingredient-within-step.entity';
import { UpdateStepWithinRecipeExecutionDto } from '../step-within-recipe-execution/dto/update-step-within-recipe-execution.dto';

@Injectable()
export class RecipeExecutionService {
  constructor(
    private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
    private ingredientWithinStepService: IngredientWithinStepService,
    @InjectRepository(RecipeExecution)
      private recipeExecutionRepository: Repository<RecipeExecution>,
) {}

  create(createRecipeExecutionDto: CreateRecipeExecutionDto) {
    //'This action adds a new recipeExecution'
    return this.recipeExecutionRepository.save(createRecipeExecutionDto);
  }

  findAll() {
    `This action returns all recipeExecution`
    return this.recipeExecutionRepository.find({
      relations: ["ingredients"]
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} recipeExecution`
    return this.recipeExecutionRepository.findOne({id: id}, {
      relations: ["ingredients", "recipe"]
    });
  }

  findAllInRecipe(idRecipe: number) {
    //return this.recipeExecutionRepository.find({recipe: idRecipe});
  }

  update(id: number, updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    //`This action updates a #${id} recipeExecution`
    return this.recipeExecutionRepository.update({id: id}, updateRecipeExecutionDto);
  }

  async removeSimpleStep(simpleStepId: number) {
    //`This action removes a #${id} recipeExecution`
    let ingredientsWithinStep = await this.findAllIngredientsWithinAStepInSimpleStep(simpleStepId);
    for (let ingredientWithinStep of ingredientsWithinStep){
      await this.ingredientWithinStepService.remove(ingredientWithinStep.id);
    }
    return this.recipeExecutionRepository.delete({id: simpleStepId});
  }

/*  async getAllStepsInRecipeExecution(id: number) {
    let steps: RecipeExecution[] = [];
    let stepsWithinRecipeExecution = await this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(id);
    for(let stepWithinRecipeExecution of stepsWithinRecipeExecution){
      steps.push(await this.findOne(stepWithinRecipeExecution.stepId));
    }
    return steps;
  }

  async getAllProgressionInRecipeExecution(id: number) {
    let progressions: RecipeExecution[] = [];
    let progressionsWithinRecipeExecution = await this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(id);
    for(let progressionWithinRecipeExecution of progressionsWithinRecipeExecution){
      progressions.push(await this.findOne(progressionWithinRecipeExecution.stepId));
    }
    return progressions;
  }*/

  getAllProgression() {
    return this.recipeExecutionRepository.find({isStep: false});
  }

  //Retourne la durée complète de la recipe execution
  async getDuration(id: number) {
    let duration = 0;
    let stepsWithinRecipeExecution = await this.findAllSimpleStepInRecipeExecution(id);
    for(let stepWithinRecipeExecution of stepsWithinRecipeExecution){
      duration += stepWithinRecipeExecution.step.duration;
    }
    let recipeExecutionsWithinRecipeExecution = await this.findAllProgressionInRecipeExecution(id);
    for(let recipeExecutionWithinRecipeExecution of recipeExecutionsWithinRecipeExecution){
      duration += await this.getDuration(recipeExecutionWithinRecipeExecution.stepId);
    }
    return duration;
  }

  //idRecipeExecution : id de la progression que contient la recette
  //TODO: rename function with recipeExecution
  async findAllIngredientsInRecipe(recipeExecutionId: number) {

    let ingredientsMap = new Map<number, IngredientWithinStep>();

    //On récupère toutes les étapes de la progression
    let steps = await this.findAllSimpleStepInRecipeExecution(recipeExecutionId);

    //pour chaque étpaes on récupère tous ses ingrédients
    for (let step of steps) {
      let stepIngredients = await this.ingredientWithinStepService.findAllIngredientsInStep2(step.id);

      // pour chaque ingrédient, on ajoute sa quantité à la map
      for (let ingredient of stepIngredients) {
        this.addIngredientToMap(ingredient, ingredientsMap);
      }
    }

    //on récupère toutes
    //TODO: cheks que ça na rien cassé
    let recipeExecutions = await this.findAllProgressionInRecipeExecution(recipeExecutionId);

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
    let ingredientId = ingredient.ingredientId;
    if (ingredientsMap.has(ingredientId)) {
      // The map already contains this ingredient so we increment the ingredient's quantity
      let currentQuantity = ingredientsMap.get(ingredientId).quantity;
      let newQuantity = currentQuantity + ingredient.quantity;
      let newIngredient = ingredientsMap.get(ingredientId);
      newIngredient.quantity = newQuantity; // increments the ingredient's quantity
      ingredientsMap.set(ingredientId, newIngredient);
    } else {
      // The map doesn't contains this ingredient so wa add it
      ingredientsMap.set(ingredientId, ingredient);
    }
  }

  //-------------- Structure refactoring --------------
  findAllSimpleStepInRecipeExecution(recipeExecutionId: number) {
    return this.stepWithinRecipeExecutionService.findAllSimpleStepInRecipeExecution(recipeExecutionId);
  }

  //TODO: refactor progression
  findAllProgressionInRecipeExecution(recipeExecutionId: number) {
    return this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(recipeExecutionId);
  }

  //TODO: ne pas prendre l'id de la table mais stepId et recipeExecutionId
  updateStepsOrderOfRecipeExecution(@Body() updateStepsWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto[]){
    return this.stepWithinRecipeExecutionService.updateStepsOrderOfRecipeExecution(updateStepsWithinRecipeExecutionDto);
  }

  findAllIngredientsWithinAStepInSimpleStep(simpleStepId: number) {
    return this.ingredientWithinStepService.findAllIngredientsInSimpleStep(simpleStepId);
  }

  //Objectif: retourner tout les ingrédients contenu dans les etapes d'une recette qui ne sont pas des progressions.
  async findAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(recipeExecutionId: number) {
    let ingredientsWithinAStepsRes: IngredientWithinStep[] = [];
    let simpleSteps = await this.findAllSimpleStepInRecipeExecution(recipeExecutionId);
    for (let simpleStep of simpleSteps){
      let ingredientsWithinStepTmp = await this.findAllIngredientsWithinAStepInSimpleStep(simpleStep.stepId);
      for (let ingredientWithinAStep of ingredientsWithinStepTmp){
        ingredientsWithinAStepsRes.push(ingredientWithinAStep);
      }
    }
    return ingredientsWithinAStepsRes;
  }


}
