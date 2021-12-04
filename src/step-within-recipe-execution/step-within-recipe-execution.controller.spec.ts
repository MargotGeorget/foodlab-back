import { Test, TestingModule } from '@nestjs/testing';
import { StepWithinRecipeExecutionController } from './step-within-recipe-execution.controller';
import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';

describe('StepWithinRecipeExecutionController', () => {
  let controller: StepWithinRecipeExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepWithinRecipeExecutionController],
      providers: [StepWithinRecipeExecutionService],
    }).compile();

    controller = module.get<StepWithinRecipeExecutionController>(StepWithinRecipeExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
