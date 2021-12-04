import {IsNumber, IsString} from "class-validator";

export class CreateRecipeDto {

    @IsString()
    name: string;

    @IsString()
    author: string;

    @IsNumber()
    guestsNumber: number;

    @IsNumber()
    seasoningCost: number;

    @IsNumber()
    recipeExecutionId: number;

    @IsNumber()
    recipeCategoryId: number;

    @IsNumber()
    costDataId: number;
}
