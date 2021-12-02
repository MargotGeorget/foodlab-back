import { Test, TestingModule } from '@nestjs/testing';
import { IngredientWithinStepController } from './ingredient-within-step.controller';
import { IngredientWithinStepService } from './ingredient-within-step.service';

describe('IngredientWithinStepController', () => {
  let controller: IngredientWithinStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientWithinStepController],
      providers: [IngredientWithinStepService],
    }).compile();

    controller = module.get<IngredientWithinStepController>(IngredientWithinStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
