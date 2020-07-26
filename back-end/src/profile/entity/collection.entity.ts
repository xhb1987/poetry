import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
    ManyToOne,
    DeleteDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Poet } from '../../poet/entity/poet.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @ManyToMany((type) => Poet, (poet) => poet.collections)
    @JoinTable()
    poets: Poet[];

    @ManyToMany((type) => User, (user) => user.collections, { cascade: true })
    @JoinTable()
    user: User;

    @Column()
    isFinished: boolean;

    @DeleteDateColumn()
    deleteAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
