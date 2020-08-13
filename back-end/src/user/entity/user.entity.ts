import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Role } from './role.entity';
import { Collection } from '../../profile/entity/collection.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @ManyToMany((type) => Role, (role) => role.user)
    @JoinTable()
    roles: Role[];

    @ManyToMany((type) => Collection, (collection) => collection.user)
    @JoinTable()
    collections: Collection[];
}
