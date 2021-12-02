import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientWithinStepDto } from './create-ingredient-within-step.dto';

export class UpdateIngredientWithinStepDto extends PartialType(CreateIngredientWithinStepDto) {}
