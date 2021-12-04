import { Test, TestingModule } from '@nestjs/testing';
import { RecipeCategoryService } from './recipe-category.service';

describe('RecipeCategoryService', () => {
  let service: RecipeCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeCategoryService],
    }).compile();

    service = module.get<RecipeCategoryService>(RecipeCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
