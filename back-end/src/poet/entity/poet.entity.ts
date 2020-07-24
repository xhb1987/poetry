import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    In,
    JoinColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Favorite } from '../../profile/entity/favorite.entity';
import { Collection } from '../../profile/entity/collection.entity';

@Entity()
@Index(['title'], { fulltext: true, sparse: true })
@Index(['paragraphs'], { fulltext: true, sparse: true })
export class Poet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    sn: string;

    @Column()
    category: string;

    @Column({ length: 6000 })
    title: string;

    @Column()
    author: string;

    @Column()
    rhythmic: string;

    @Column()
    chapter: string;

    @Column()
    section: string;

    @Column()
    notes: string;

    @Column({ length: 6000 })
    paragraphs: string;

    @Column()
    comment: string;

    @Column()
    content: string;

    @Column()
    create_time: Date;

    @ManyToMany((type) => Favorite, (favorite) => favorite.poets)
    @JoinTable()
    favorites: Favorite[];

    @ManyToOne((type) => Collection, (collection) => collection.poets)
    collections: Collection[];
}
