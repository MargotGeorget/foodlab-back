import { Test, TestingModule } from '@nestjs/testing';
import { RecipeCategoryController } from './recipe-category.controller';
import { RecipeCategoryService } from './recipe-category.service';

describe('RecipeCategoryController', () => {
  let controller: RecipeCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeCategoryController],
      providers: [RecipeCategoryService],
    }).compile();

    controller = module.get<RecipeCategoryController>(RecipeCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
