import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IngredientCategory {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
