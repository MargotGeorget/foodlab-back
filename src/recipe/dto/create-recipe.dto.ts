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
    recipeCategoryId: number;

    @IsNumber()
    costDataId: number;

    @IsNumber()
    recipeExecutionId: number;
}
