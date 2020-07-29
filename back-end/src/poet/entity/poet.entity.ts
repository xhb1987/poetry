import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { Collection } from '../../profile/entity/collection.entity';
import { RecommendationPoet } from '../../recommendation/entity/recommendation.entity';

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

    @ManyToOne((type) => Collection, (collection) => collection.poets)
    collections: Collection[];
}
