import {IsNumber} from "class-validator";

export class CreateIngredientWithinStepDto {

    @IsNumber()
    ingredientId: number;

    @IsNumber()
    recipeExecutionId: number;
}
