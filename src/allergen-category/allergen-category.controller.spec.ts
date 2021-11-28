import { Test, TestingModule } from '@nestjs/testing';
import { AllergenCategoryController } from './allergen-category.controller';
import { AllergenCategoryService } from './allergen-category.service';

describe('AllergenCategoryController', () => {
  let controller: AllergenCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergenCategoryController],
      providers: [AllergenCategoryService],
    }).compile();

    controller = module.get<AllergenCategoryController>(AllergenCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
