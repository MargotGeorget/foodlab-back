import { Test, TestingModule } from '@nestjs/testing';
import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';

describe('StepWithinRecipeExecutionService', () => {
  let service: StepWithinRecipeExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StepWithinRecipeExecutionService],
    }).compile();

    service = module.get<StepWithinRecipeExecutionService>(StepWithinRecipeExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
