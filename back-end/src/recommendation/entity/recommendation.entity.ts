import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Poetry } from '../../poetry/entity/poetry.entity';

@Entity()
export class RecommendationPoetry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne((type) => Poetry)
    @JoinColumn()
    poetry: Poetry;
}
