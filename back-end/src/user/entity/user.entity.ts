import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Role } from "./role.entity";
import { Profile } from "../../profile/entity/profile.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @ManyToMany((type) => Role, (role) => role.user)
  @JoinTable()
  roles: Role[];

  @OneToOne((type) => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  // @OneToOne(type => )
  // @OneToOne((type) => Profile)
  // @JoinColumn()
  // profile!: Profile;

  // User(name: string, password: string, profile?: Profile) {
  //   this.name = name;
  //   this.password = password;
  //   profile ? (this.profile = profile) : null;
  // }
}
