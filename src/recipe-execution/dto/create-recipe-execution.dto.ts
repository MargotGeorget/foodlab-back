import {IsNumber, IsString, IsBoolean} from "class-validator";

export class CreateRecipeExecutionDto {

    @IsBoolean()
    isStep: boolean; // indicates whether the recipe execution is a simple step or a full "progression"

    @IsString()
    stepTitle?: string; // if recipe execution is not a step it doesn't need a title

    // @IsString()
    // stepDescription?: string; // if recipe execution is not a step it doesn't need a description
    //
    // @IsNumber()
    // duration?: number; // if recipe execution is not a step, its duration is calculated
}
