import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    Column,
    OneToMany,
    JoinColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Poet } from '../../poet/entity/poet.entity';
import { ProfileRecites } from './profile.recites.entity';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @ManyToMany((type) => Poet, (poet) => poet.favorites)
    @JoinTable()
    favorites: Poet[];

    @OneToMany(
        (type) => ProfileRecites,
        (profileRecites) => profileRecites.profile
    )
    @JoinTable()
    recites: ProfileRecites[];

    @ManyToMany((type) => Poet, (poet) => poet.finished)
    @JoinTable()
    finished: Poet[];

    @OneToOne((type) => User, (user) => user.profile)
    user: User;
}
