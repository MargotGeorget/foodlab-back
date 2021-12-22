import {IsString} from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    // TODO create email validator
    @IsString()
    email: string;

    @IsString()
    password: string;
}
