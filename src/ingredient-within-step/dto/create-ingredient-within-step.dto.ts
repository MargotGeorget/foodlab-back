import {IsNumber} from "class-validator";
import { Column } from 'typeorm';

export class CreateIngredientWithinStepDto {

    @IsNumber()
    ingredientId: number;

    @IsNumber()
    recipeExecutionId: number;

    @IsNumber()
    quantity: number

}
