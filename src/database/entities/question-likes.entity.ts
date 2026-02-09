import { Entity, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { BaseEntity } from './common';

@Entity()
@Unique(['user', 'question'])
export class QuestionLikes extends BaseEntity {
  @ManyToOne(() => User, (user) => user.questionLikes, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Question, (question) => question.likes, {
    onDelete: 'CASCADE',
  })
  question: Question;
}
