import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Ingredient} from "../../ingredient/entities/ingredient.entity";

@Entity()
export class AllergenCategory {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

  // one AllergenCategory is related to many Ingredients
  @OneToMany(() => Ingredient, ingredient => ingredient.allergenCategory)
  ingredients: Ingredient[];
}
