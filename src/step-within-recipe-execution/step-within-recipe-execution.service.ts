import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    console.log(createStepWithinRecipeExecutionDto);

    //on vérifie que l'on ajoute pas la propre progression de la recette dans la recette
    let isSameRecipeExecution = createStepWithinRecipeExecutionDto.stepId == createStepWithinRecipeExecutionDto.recipeExecutionId;
    if(isSameRecipeExecution) {
      console.log("ici")
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
        let steps = await this.findAllStepInRecipeExecution(
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

  findAllStepInRecipeExecution(idRecipeExecution: number) {
    //`This action returns all the steps in a #${id} recipeExecution`
    return this.stepWithinRecipeExecutionRepository.find({
      where: { recipeExecutionId: idRecipeExecution },
      relations: ['step'],
    });
  }

  findAllProgressionInRecipeExecution(idRecipeExecution: number) {
    //`This action returns all the steps in a #${id} recipeExecution`
    return this.stepWithinRecipeExecutionRepository.find({
      select: ['step', 'number'],
      relations: ['step'],
      where: { recipeExecutionId: idRecipeExecution,
        step:{isStep: false}},

    });
  }

  update(id: number, updateStepWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto) {
    //`This action updates a #${id} stepWithinRecipeExecution`
    return this.stepWithinRecipeExecutionRepository.update({ id: id }, updateStepWithinRecipeExecutionDto);
  }

  remove(id: number) {
    //`This action removes a #${id} stepWithinRecipeExecution`
    return this.stepWithinRecipeExecutionRepository.delete({ id: id });
  }
}
