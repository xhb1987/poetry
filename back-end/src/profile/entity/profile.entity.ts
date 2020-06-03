import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @OneToOne((type) => User, (user) => user.profile)
  user: User;
}
