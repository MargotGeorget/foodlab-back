import {IsNumber} from "class-validator";

export class CreateCostDataDto {

    @IsNumber()
    averageHourlyCost: number;

    @IsNumber()
    flatrateHourlyCost: number;

    @IsNumber()
    coefWithCharges: number;

    @IsNumber()
    coefWithoutCharges: number;
}
