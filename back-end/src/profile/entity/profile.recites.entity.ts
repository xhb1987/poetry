import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Poet } from '../../poet/entity/poet.entity';

@Entity()
export class ProfileRecites {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => Profile, (profile) => profile.recites)
    profile: Profile;

    @ManyToMany((type) => Poet, (poet) => poet.id)
    @JoinTable()
    poet: Poet[];
}
