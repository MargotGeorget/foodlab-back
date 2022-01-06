import { Injectable } from '@nestjs/common';
import { CreateRecipeExecutionDto } from './dto/create-recipe-execution.dto';
import { UpdateRecipeExecutionDto } from './dto/update-recipe-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeExecution } from './entities/recipe-execution.entity';
import { Repository } from 'typeorm';
import { StepWithinRecipeExecutionService } from '../step-within-recipe-execution/step-within-recipe-execution.service';
import { IngredientWithinStepService } from '../ingredient-within-step/ingredient-within-step.service';
import { IngredientWithinStep } from '../ingredient-within-step/entities/ingredient-within-step.entity';

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

  async remove(id: number) {
    //`This action removes a #${id} recipeExecution`
    let ingredientsWithinStep = await this.ingredientWithinStepService.findAllIngredientsInStep(id);
    console.log(ingredientsWithinStep);
    for (let ingredientWithinStep of ingredientsWithinStep){
      console.log("hay");
      await this.ingredientWithinStepService.remove(ingredientWithinStep.id);
    }
    return this.recipeExecutionRepository.delete({id: id});
  }

  async getAllStepsInRecipeExecution(id: number) {
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
  }

  getAllProgression() {
    return this.recipeExecutionRepository.find({isStep: false});
  }

  //Retourne la durée complète de la recipe execution
  async getDuration(id: number) {
    let duration = 0;
    let steps = await this.getAllStepsInRecipeExecution(id);
    for(let step of steps){
      duration += step.duration;
    }
    let progressions = await this.getAllProgressionInRecipeExecution(id);
    for(let progression of progressions){
      duration += await this.getDuration(progression.id);
    }
    return duration;
  }

  //idRecipeExecution : id de la progression que contient la recette
  async findAllIngredientsInRecipe(idRecipeExecution: number) {

    let ingredientsMap = new Map<number, IngredientWithinStep>();

    //On récupère toutes les étapes de la progression
    let steps = await this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(idRecipeExecution);

    //pour chaque étpaes on récupère tous ses ingrédients
    for (let step of steps) {
      let stepIngredients = await this.ingredientWithinStepService.findAllIngredientsInStep2(step.id);

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
}
