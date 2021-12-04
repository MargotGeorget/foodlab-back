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
        private StepWithinRecipeExecutionRepository: Repository<StepWithinRecipeExecution>,
  ) {}

  create(createStepWithinRecipeExecutionDto: CreateStepWithinRecipeExecutionDto) {
    return 'This action adds a new stepWithinRecipeExecution';
  }

  findAll() {
    return `This action returns all stepWithinRecipeExecution`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stepWithinRecipeExecution`;
  }

  update(id: number, updateStepWithinRecipeExecutionDto: UpdateStepWithinRecipeExecutionDto) {
    return `This action updates a #${id} stepWithinRecipeExecution`;
  }

  remove(id: number) {
    return `This action removes a #${id} stepWithinRecipeExecution`;
  }
}
