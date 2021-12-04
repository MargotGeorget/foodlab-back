import { Test, TestingModule } from '@nestjs/testing';
import { RecipeExecutionService } from './recipe-execution.service';

describe('RecipeExecutionService', () => {
  let service: RecipeExecutionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeExecutionService],
    }).compile();

    service = module.get<RecipeExecutionService>(RecipeExecutionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
