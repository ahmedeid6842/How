import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Follow } from "src/follow/follow.entity";
import { Question } from "src/question/question.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 50, name: "user_name" })
  userName: string;

  @Column()
  password: string;

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[]
}