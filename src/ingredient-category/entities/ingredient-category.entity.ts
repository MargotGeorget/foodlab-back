import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Ingredient} from "../../ingredient/entities/ingredient.entity";

@Entity()
export class IngredientCategory {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Ingredient, ingredient => ingredient.ingredientCategory)
  ingredients: Ingredient[];
}
