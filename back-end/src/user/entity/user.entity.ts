import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Collection } from '../../profile/entity/collection.entity';
import { Favorite } from '../../profile/entity/favorite.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @ManyToMany((type) => Role, (role) => role.user)
    @JoinTable()
    roles: Role[];

    @ManyToMany((type) => Collection, (collection) => collection.user)
    @JoinTable()
    collections: Collection[];

    // @OneToOne((type) => Favorite)
    // @JoinColumn()
    // favorite: Favorite;

    // @OneToOne((type) => Favorite)
    // @JoinColumn()
    // favorite: Favorite;

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
