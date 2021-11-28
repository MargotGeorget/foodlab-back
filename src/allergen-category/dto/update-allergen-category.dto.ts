import { PartialType } from '@nestjs/mapped-types';
import { CreateAllergenCategoryDto } from './create-allergen-category.dto';

export class UpdateAllergenCategoryDto extends PartialType(CreateAllergenCategoryDto) {}
