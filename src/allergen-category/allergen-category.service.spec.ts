import { Test, TestingModule } from '@nestjs/testing';
import { AllergenCategoryService } from './allergen-category.service';

describe('AllergenCategoryService', () => {
  let service: AllergenCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllergenCategoryService],
    }).compile();

    service = module.get<AllergenCategoryService>(AllergenCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
