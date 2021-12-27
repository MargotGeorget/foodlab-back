import {IsNumber, IsString} from "class-validator";

export class CreateAllergenCategoryDto {

    @IsString()
    name: string;

}
