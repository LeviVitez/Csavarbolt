import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rendeles } from './rendelesAdat';

@Entity()
export class Csavar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipus: string;

  @Column()
  hossz: number;

  @Column()
  keszlet: number;

  @Column()
  ar: number;

  @ManyToOne(() => Rendeles, (rendeles) => rendeles.csavarok)
  rendeles: Rendeles;
}