import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToOne,
} from 'typeorm';
import { Collection } from '../../profile/entity/collection.entity';

@Entity()
@Index(['title'], { fulltext: true, sparse: true })
@Index(['paragraphs'], { fulltext: true, sparse: true })
export class Poetry {
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

    @ManyToOne((type) => Collection, (collection) => collection.poetries)
    collections: Collection[];
}
