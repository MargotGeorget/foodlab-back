import {IsString} from "class-validator";

export class CreateRecipeCategoryDto {

    @IsString()
    name: string

}
