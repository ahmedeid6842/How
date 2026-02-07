import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './common';

@Entity()
export class Profile extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', name: 'social_linkes', nullable: true, array: true })
  socialLinks: string[];

  @Column({ type: 'text', nullable: true, array: true })
  interests: string[];

  @Column({ default: 0, name: 'num_question_asked' })
  numQuestionAsked: number;

  @Column({ default: 0, name: 'num_question_answered' })
  numQuestionAnswered: number;

  @Column({ default: 0, name: 'num_followers' })
  numFollowers: number;

  @Column({ default: 0, name: 'num_following' })
  numFollowing: number;

  @Column({ default: 0, name: 'num_likes' })
  numLikes: number;

  @Column({ type: 'boolean', default: true, name: 'is_public' })
  isPublic: boolean;

  @OneToOne(() => User, (user) => user.profile, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
