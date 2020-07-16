import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Poet } from '../../poet/entity/poet.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToMany((type) => Poet, (poet) => poet.favorites)
    @JoinTable()
    poets: Poet[];

    // @OneToOne((type) => User, (user) => user.favorite)
    // user: User;
}
