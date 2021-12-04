import { Test, TestingModule } from '@nestjs/testing';
import { RecipeExecutionController } from './recipe-execution.controller';
import { RecipeExecutionService } from './recipe-execution.service';

describe('RecipeExecutionController', () => {
  let controller: RecipeExecutionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeExecutionController],
      providers: [RecipeExecutionService],
    }).compile();

    controller = module.get<RecipeExecutionController>(RecipeExecutionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
