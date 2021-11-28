import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCategoryController } from './ingredient-category.controller';
import { IngredientCategoryService } from './ingredient-category.service';

describe('IngredientCategoryController', () => {
  let controller: IngredientCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientCategoryController],
      providers: [IngredientCategoryService],
    }).compile();

    controller = module.get<IngredientCategoryController>(IngredientCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
