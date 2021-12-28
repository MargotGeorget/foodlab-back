import { IsNumber, IsString, IsOptional } from "class-validator";
import {Optional} from "@nestjs/common";

export class CreateIngredientDto {

  @IsString()
  name: string;

  @IsNumber()
  unitaryPrice: number;

  @IsString()
  unit: string;

  @IsNumber()
  stockQuantity: number;

  @IsOptional()
  @IsNumber()
  allergenCategoryId?: number;

  @IsNumber()
  ingredientCategoryId: number;
}
