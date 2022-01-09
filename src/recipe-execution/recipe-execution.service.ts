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
  ) {
  }

  create(createRecipeExecutionDto: CreateRecipeExecutionDto) {
    //'This action adds a new recipeExecution'
    return this.recipeExecutionRepository.save(createRecipeExecutionDto);
  }

  findAll() {
    `This action returns all recipeExecution`;
    return this.recipeExecutionRepository.find({
      relations: ['ingredients'],
    });
  }

  findOne(id: number) {
    //`This action returns a #${id} recipeExecution`
    return this.recipeExecutionRepository.findOne({ id: id }, {
      relations: ['ingredients', 'recipe'],
    });
  }

  findAllInRecipe(idRecipe: number) {
    //return this.recipeExecutionRepository.find({recipe: idRecipe});
  }

  update(id: number, updateRecipeExecutionDto: UpdateRecipeExecutionDto) {
    //`This action updates a #${id} recipeExecution`
    return this.recipeExecutionRepository.update({ id: id }, updateRecipeExecutionDto);
  }

  async removeStepWithinRecipeExecution(stepWithinRecipeExecutionId: number){
    let stepWithinRecipeExecution = await this.stepWithinRecipeExecutionService.findOne(stepWithinRecipeExecutionId);
    let step = await this.findOne(stepWithinRecipeExecution.stepId);
    if(step.isStep){
      //Si c'est juste une étape on supprime l'étape et les ingrédients de l'étape (table de joiture)
      return this.removeSimpleStep(stepWithinRecipeExecution.stepId);
    } else {
      //Sinon on supprime juste la liaison entre la recipe execution et l'autre recipe execution
      await this.stepWithinRecipeExecutionService.remove(stepWithinRecipeExecutionId);
    }
  }

  async removeSimpleStep(simpleStepId: number) {
    //`This action removes a #${id} recipeExecution`
    let ingredientsWithinStep = await this.findAllIngredientsWithinAStepInSimpleStep(simpleStepId);
    console.log(ingredientsWithinStep);
    for (let ingredientWithinStep of ingredientsWithinStep) {
      await this.ingredientWithinStepService.remove(ingredientWithinStep.id);
    }
    await this.stepWithinRecipeExecutionService.removeStepWithinRecipeExecutionByStep(simpleStepId);
    return this.recipeExecutionRepository.delete({ id: simpleStepId });
  }

  async removeRecipeExecution(recipeExecutionId){
    let simpleSteps = await this.findAllSimpleStepInRecipeExecution(recipeExecutionId);
    console.log(simpleSteps);
    for (let simpleStep of simpleSteps){
      await this.removeSimpleStep(simpleStep.step.id);
    }
    await this.stepWithinRecipeExecutionService.removeStepWithinRecipeExecutionByStep(recipeExecutionId);
    return this.recipeExecutionRepository.delete({id: recipeExecutionId});
  }

  isUsedInOtherRecipeExecution(recipeExecutionId: number){
    return this.stepWithinRecipeExecutionService.isUsedInOtherRecipeExecution(recipeExecutionId);
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
    return this.recipeExecutionRepository.find({ isStep: false });
  }

  //Retourne la durée complète de la recipe execution
  async getRecipeExecutionDuration(id: number) {
    let duration = 0;
    let stepsWithinRecipeExecution = await this.findAllSimpleStepInRecipeExecution(id);
    for (let stepWithinRecipeExecution of stepsWithinRecipeExecution) {
      duration += stepWithinRecipeExecution.step.duration;
    }
    let recipeExecutionsWithinRecipeExecution = await this.findAllProgressionInRecipeExecution(id);
    for (let recipeExecutionWithinRecipeExecution of recipeExecutionsWithinRecipeExecution) {
      duration += await this.getRecipeExecutionDuration(recipeExecutionWithinRecipeExecution.stepId);
    }
    return duration;
  }

  //idRecipeExecution : id de la progression que contient la recette
  //TODO: rename function with recipeExecution
  //Retourne tout les ingredient présent dans une recipe execution, y compris ceux contenu dans les sous recipe execution
  //Reduce doublons
  async findAllIngredientsInRecipeExecution(recipeExecutionId: number) {

    let ingredientsMap = new Map<number, IngredientWithinStep>();

    let stepsIngredients = await this.findAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(recipeExecutionId);
    // pour chaque ingrédient, on ajoute sa quantité à la map
    for (let ingredient of stepsIngredients) {
      this.addIngredientToMap(ingredient, ingredientsMap);
    }

    //on récupère toutes les progressions
    //TODO: cheks que ça na rien cassé
    let recipeExecutions = await this.findAllProgressionInRecipeExecution(recipeExecutionId);

    // Pour chaque progression on récupère ses ingrédients
    for (let recipeExecution of recipeExecutions) {
      let executionIngredients = await this.findAllIngredientsInRecipeExecution(recipeExecution.stepId);

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
      // The map doesn't contains this ingredient so we add it
      ingredientsMap.set(ingredientId, ingredient);
    }
  }

  //-------------- Structure refactoring --------------
  findAllSimpleStepInRecipeExecution(recipeExecutionId: number) {
    return this.stepWithinRecipeExecutionService.findAllSimpleStepInRecipeExecution(recipeExecutionId);
  }

  findAllStepInRecipeExecution(idRecipeExecution: number) {
    return this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(idRecipeExecution);
  }

  //TODO: refactor progression
  findAllProgressionInRecipeExecution(recipeExecutionId: number) {
    return this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(recipeExecutionId);
  }

  //TODO: ne pas prendre l'id de la table mais stepId et recipeExecutionId
  updateStepsOrderOfRecipeExecution(@Body() updateStepsWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto[]) {
    return this.stepWithinRecipeExecutionService.updateStepsOrderOfRecipeExecution(updateStepsWithinRecipeExecutionDto);
  }

  async findAllIngredientsWithinAStepInSimpleStep(simpleStepId: number) {
    const a = await this.ingredientWithinStepService.findAllIngredientsInSimpleStep(simpleStepId);
    return this.ingredientWithinStepService.findAllIngredientsInSimpleStep(simpleStepId);
  }

  //Objectif: retourner tout les ingrédients contenu dans les etapes d'une recette qui ne sont pas des progressions.
  async findAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(recipeExecutionId: number) {
    let ingredientsWithinAStepsRes: IngredientWithinStep[] = [];
    let simpleSteps = await this.findAllSimpleStepInRecipeExecution(recipeExecutionId);
    for (let simpleStep of simpleSteps) {
      let ingredientsWithinStepTmp = await this.findAllIngredientsWithinAStepInSimpleStep(simpleStep.stepId);
      for (let ingredientWithinAStep of ingredientsWithinStepTmp) {
        ingredientsWithinAStepsRes.push(ingredientWithinAStep);
      }
    }
    return ingredientsWithinAStepsRes;
  }


}
