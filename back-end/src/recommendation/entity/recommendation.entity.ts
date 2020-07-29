import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { Poet } from '../../poet/entity/poet.entity';

@Entity()
export class RecommendationPoet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne((type) => Poet)
    @JoinColumn()
    poet: Poet;
}
