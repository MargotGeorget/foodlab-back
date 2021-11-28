import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCategoryService } from './ingredient-category.service';

describe('IngredientCategoryService', () => {
  let service: IngredientCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientCategoryService],
    }).compile();

    service = module.get<IngredientCategoryService>(IngredientCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
