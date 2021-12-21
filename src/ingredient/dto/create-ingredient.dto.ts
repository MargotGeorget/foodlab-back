import { IsNumber, IsString } from "class-validator";
import { Optional } from '@nestjs/common';

export class CreateIngredientDto {

  @IsString()
  name: string;

  @IsNumber()
  unitaryPrice: number;

  @IsString()
  unit: string;

  @IsNumber()
  stockQuantity: number;

  // @IsNumber()
  // @Optional()
  // allergenCategoryId?: number;

  @IsNumber()
  ingredientCategoryId: number;
}
