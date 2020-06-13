import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Poet } from "../../poet/entity/poet.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @ManyToMany((type) => Poet, (poet) => poet.favorites)
  @JoinTable()
  favorites: Poet[];

  @ManyToMany((type) => Poet, (poet) => poet.recites)
  @JoinTable()
  recites: Poet[];

  @ManyToMany((type) => Poet, (poet) => poet.finished)
  @JoinTable()
  finished: Poet[];

  @OneToOne((type) => User, (user) => user.profile)
  user: User;
}
