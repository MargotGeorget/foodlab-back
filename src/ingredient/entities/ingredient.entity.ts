export class Ingredient {
    name: string
    unitaryPrice: number
    unit: string

    constructor(name: string, unitaryPrice: number, unit: string) {
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
    }
}
