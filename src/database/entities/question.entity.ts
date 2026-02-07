import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { QuestionLikes } from "./question-likes.entity";
import { Answer } from "./answer.entity";
import { AuditableEntity } from "./common";

@Entity()
export class Question extends AuditableEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes_count: number;

  @ManyToOne(() => User, (user) => user.questions, { onDelete: "CASCADE" })
  author: User;

  @OneToMany(() => QuestionLikes, (likes) => likes.question)
  likes: QuestionLikes[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
