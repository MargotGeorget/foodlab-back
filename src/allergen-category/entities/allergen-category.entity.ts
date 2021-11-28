import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AllergenCategory {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

}
