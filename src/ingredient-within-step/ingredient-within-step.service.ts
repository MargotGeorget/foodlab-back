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
  async findAllIngredientsInRecipe(idRecipeExecution:number){
    let ingredients: IngredientWithinStep[] = [];
    //On récupère toutes les étapes de la progression
    let steps = await this.stepWithinRecipeExecutionService.findAllStepInRecipeExecution(idRecipeExecution);
    //pour chaque étpaes on récupère tout ses ingrédients
    for(let step of steps) {
      let newIngredients = await this.ingredientWithinStepRepository.find({
        relations: ['ingredient'],
        where: { recipeExecutionId: step.stepId },
      });
      //on ajoute tout les ingredients trouver dans notre liste d'ingrédients à retourner
      for(let ingredient of newIngredients){
        ingredients.push(ingredient);
      }
    }
    //on récupère toutes les progressions
    let progressions = await this.stepWithinRecipeExecutionService.findAllProgressionInRecipeExecution(idRecipeExecution);
    for (let progression of progressions){
      let otherIngredients = await this.findAllIngredientsInRecipe(progression.stepId);
      for (let ingredient of otherIngredients) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
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
