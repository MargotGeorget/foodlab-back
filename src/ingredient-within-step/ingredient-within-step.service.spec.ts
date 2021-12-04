import { Test, TestingModule } from '@nestjs/testing';
import { IngredientWithinStepService } from './ingredient-within-step.service';

describe('IngredientWithinStepService', () => {
  let service: IngredientWithinStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientWithinStepService],
    }).compile();

    service = module.get<IngredientWithinStepService>(IngredientWithinStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
