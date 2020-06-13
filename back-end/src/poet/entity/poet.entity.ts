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
} from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Profile } from "../../profile/entity/profile.entity";

@Entity()
@Index(["title"], { fulltext: true, sparse: true })
@Index(["paragraphs"], { fulltext: true, sparse: true })
export class Poet {
  @PrimaryGeneratedColumn()
  @JoinColumn()
  id: number;

  @Column()
  sn: string;

  @Column()
  category: string;

  @Index({ fulltext: true })
  @Column({ length: 6000 })
  title: string;

  @Index({ fulltext: true })
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

  @Index({ fulltext: true })
  @Column({ length: 6000 })
  paragraphs: string;

  @Column()
  comment: string;

  @Column()
  content: string;

  @Column()
  create_time: Date;

  @ManyToMany((type) => Profile, (profile) => profile.favorites)
  @JoinTable()
  favorites: Profile[];

  @ManyToMany((type) => Profile, (profile) => profile.finished)
  @JoinTable()
  finished: Profile[];

  @ManyToMany((type) => Profile, (profile) => profile.recites)
  @JoinTable()
  recites: Profile[];
}
