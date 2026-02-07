import { Entity, ManyToOne, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { AnswerLikes } from './answer-likes.entity';
import { AuditableEntity } from './common';

@Entity()
export class Answer extends AuditableEntity {
  @Column()
  answer: string;

  @Column({ default: 0, name: 'likes_count' })
  likesCount: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  question: Question;

  @ManyToOne(() => User, (user) => user.answers, { onDelete: 'CASCADE' })
  respondent: User;

  @OneToMany(() => AnswerLikes, (answerLike) => answerLike.answer)
  likes: AnswerLikes[];
}
