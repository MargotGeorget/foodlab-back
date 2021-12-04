import {IsNumber} from "class-validator";

export class CreateStepWithinRecipeExecutionDto {

    @IsNumber()
    recipeExecutionId: number;

    @IsNumber()
    stepId: number;

    @IsNumber()
    number: number;
}
