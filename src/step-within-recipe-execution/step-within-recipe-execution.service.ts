import { Injectable } from '@nestjs/common';
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

  create(createStepWithinRecipeExecutionDto: CreateStepWithinRecipeExecutionDto) {
    //This action adds a new stepWithinRecipeExecution'
    console.log(createStepWithinRecipeExecutionDto);
    return this.stepWithinRecipeExecutionRepository.save(createStepWithinRecipeExecutionDto);
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
