import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionLikes } from "./question-likes.entity";
import { Answer } from "src/answer/answer.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes_count: number;

  @CreateDateColumn()
  creation_date: Date;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: "CASCADE" })
  author: User;

  @OneToMany(() => QuestionLikes, (likes) => likes.question)
  likes: QuestionLikes[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}