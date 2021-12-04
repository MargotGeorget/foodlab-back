import { Column, OneToMany } from 'typeorm';
import { IsNumber, IsString } from "class-validator";
import { IngredientWithinStep } from '../../ingredient-within-step/entities/ingredient-within-step.entity';

export class CreateIngredientDto {

  @IsString()
  name: string;

  @IsNumber()
  unitaryPrice: number;

  @IsString()
  unit: string;

  @IsNumber()
  allergenCategoryId?: number;

  @IsNumber()
  ingredientCategoryId: number;
}
