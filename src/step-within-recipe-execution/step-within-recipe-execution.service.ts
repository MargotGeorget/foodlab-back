import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStepWithinRecipeExecutionDto } from './dto/create-step-within-recipe-execution.dto';
import { UpdateStepWithinRecipeExecutionDto } from './dto/update-step-within-recipe-execution.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StepWithinRecipeExecution } from './entities/step-within-recipe-execution.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StepWithinRecipeExecutionService {
  constructor(
    @InjectRepository(StepWithinRecipeExecution)
    private stepWithinRecipeExecutionRepository: Repository<StepWithinRecipeExecution>,
  ) {
  }

  async create(createStepWithinRecipeExecutionDto: CreateStepWithinRecipeExecutionDto) {
    //This action adds a new stepWithinRecipeExecution'

    //on vérifie que l'on ajoute pas la propre progression de la recette dans la recette
    let isSameRecipeExecution = createStepWithinRecipeExecutionDto.stepId == createStepWithinRecipeExecutionDto.recipeExecutionId;
    if (isSameRecipeExecution) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'You cannot add its own recipe execution to a recipe ',
      }, HttpStatus.CONFLICT);
    } else {

      //Si l'étape que l'on veut ajouter est une progression il faut vérifier qu'elle ne contient pas déjà l'étape dans
      // laquelle on veut l'ajouter sinon boucle infini
      let stepContainRecipeExecution = await this.stepWithinRecipeExecutionRepository.find({
        stepId: createStepWithinRecipeExecutionDto.recipeExecutionId,
        recipeExecutionId: createStepWithinRecipeExecutionDto.stepId,
      });

      if (stepContainRecipeExecution.length > 0) {
        throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'The step you want to add to the recipe already contains this recipe in its step list, ' +
            'you cannot add recipes to each other in another recipe ',
        }, HttpStatus.CONFLICT);
      } else {

        //On récupère le nombre d'étape dajà présent dans la recette pour trouver le number de la recette
        let steps = await this.findAllSimpleStepInRecipeExecution(
          createStepWithinRecipeExecutionDto.recipeExecutionId,
        );
        let nbOfSteps = steps.length + 1;
        return this.stepWithinRecipeExecutionRepository.save({
          stepId: createStepWithinRecipeExecutionDto.stepId,
          recipeExecutionId: createStepWithinRecipeExecutionDto.recipeExecutionId,
          number: nbOfSteps,
        });
      }
    }
  }

  findAll() {
    //`This action returns all stepWithinRecipeExecution`
    return this.stepWithinRecipeExecutionRepository.find();
  }

  findOne(id: number) {
    //`This action returns a #${id} stepWithinRecipeExecution`
    return this.stepWithinRecipeExecutionRepository.findOne({ id: id });
  }

  findAllSimpleStepInRecipeExecution(idRecipeExecution: number) {
    //`This action returns all the steps in a #${id} recipeExecution`
    return this.stepWithinRecipeExecutionRepository.find({
      where: { recipeExecutionId: idRecipeExecution,
        step: { isStep: true }
      },
      relations: ['step'],
    });
  }

  findAllStepInRecipeExecution(idRecipeExecution: number) {
    //`This action returns all the steps in a #${id} recipeExecution`
    return this.stepWithinRecipeExecutionRepository.find({
      where: { recipeExecutionId: idRecipeExecution},
      relations: ['step'],
    });
  }

  findAllProgressionInRecipeExecution(idRecipeExecution: number) {
    //`This action returns all the steps in a #${id} recipeExecution`
    return this.stepWithinRecipeExecutionRepository.find({
      select: ['step', 'number'],
      relations: ['step'],
      where: {
        recipeExecutionId: idRecipeExecution,
        step: { isStep: false }
      },

    });
  }

  update(id: number, updateStepWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto) {
    //`This action updates a #${id} stepWithinRecipeExecution`
    return this.stepWithinRecipeExecutionRepository.update({ id: id }, updateStepWithinRecipeExecutionDto);
  }

  //TODO: ne pas prendre l'id de la table mais stepId et recipeExecutionId
  updateStepsOrderOfRecipeExecution(@Body() updateStepsWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto[]) {
    //Vérifier qu'aucune valeur number soit supérieur au nombre de valeur
    let valid = updateStepsWithinRecipeExecutionDto.every(step =>
      step.number <= updateStepsWithinRecipeExecutionDto.length && step.number > 0);
    //Vérifier que toutes les valeurs sont différentes
    if (valid) {
      valid = updateStepsWithinRecipeExecutionDto.every(data1 =>
        updateStepsWithinRecipeExecutionDto.every((data2) =>
          data1 === data2 || data1.number != data2.number));
    }
    let res = [];
    if (valid) {
      for (let updateStepWithinRecipeExecutionDto of updateStepsWithinRecipeExecutionDto) {
        res.push(this.update(updateStepWithinRecipeExecutionDto.id, updateStepWithinRecipeExecutionDto));
      }
    } else {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Number of step must be different and between 1 and ' + updateStepsWithinRecipeExecutionDto.length,
      }, HttpStatus.CONFLICT);
    }
    return res;
  }

  async isUsedInOtherRecipeExecution(recipeExecutionId: number){
    let recipeExecutions = await this.stepWithinRecipeExecutionRepository.find({stepId: recipeExecutionId});
    return recipeExecutions.length > 0;
  }

  //TODO: demander à Nathan comment bien nommer cette fonction
  async removeStepWithinRecipeExecutionByStep(stepId: number) {
    let stepsWithinRecipeExecution = await this.stepWithinRecipeExecutionRepository.find({stepId: stepId});
    for (let stepWithinRecipeExecution of stepsWithinRecipeExecution) {
      await this.remove(stepWithinRecipeExecution.id);
    }
  }

  async remove(stepWithinRecipeExecutionId: number) {
    //`This action removes a #${id} stepWithinRecipeExecution`
    let stepWithinRecipeExecution = await this.findOne(stepWithinRecipeExecutionId);
    let numberOfThisStep = stepWithinRecipeExecution.number;
    //récupérer toutes les autre stepWithinRecipeExecution de la même recipe execution
    let stepsWithinRecipeExecution = await this.findAllStepInRecipeExecution(stepWithinRecipeExecution.recipeExecutionId);
    for (let step of stepsWithinRecipeExecution){
      if (step.number > numberOfThisStep){
        await this.stepWithinRecipeExecutionRepository.update({id: step.id}, { number:step.number-1 } );
      }
    }
    return this.stepWithinRecipeExecutionRepository.delete({ id: stepWithinRecipeExecutionId });
  }
}
