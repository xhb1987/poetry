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
import { Poetry } from '../../poetry/entity/poetry.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @ManyToMany((type) => Poetry, (poetry) => poetry.collections)
    @JoinTable()
    poetries: Poetry[];

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
