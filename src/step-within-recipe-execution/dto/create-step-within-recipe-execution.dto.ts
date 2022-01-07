import {IsNumber} from "class-validator";
import { Optional } from '@nestjs/common';

export class CreateStepWithinRecipeExecutionDto {

    @IsNumber()
    recipeExecutionId: number;

    @IsNumber()
    stepId: number;

    // @IsNumber()
    // @Optional()
    // number: number;

}
