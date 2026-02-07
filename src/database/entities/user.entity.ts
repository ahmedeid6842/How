import { Entity, Column, OneToMany, OneToOne } from "typeorm";
import { Follow } from "./follow.entity";
import { Question } from "./question.entity";
import { QuestionLikes } from "./question-likes.entity";
import { Answer } from "./answer.entity";
import { Profile } from "./profile.entity";
import { BaseEntity } from "./common";

@Entity()
export class User extends BaseEntity {
  @Column({ length: 100 })
  email: string;

  @Column({ length: 50, name: "user_name" })
  userName: string;

  @Column()
  password: string;

  @Column({nullable: true, name: "verification_code"})
  verificationCode: string;

  @Column({ default: false, name: "is_verified" })
  isVerified: boolean;

  @Column({ name: "verification_code_expires_at", type: "timestamp", nullable: true})
  verificationCodeExpiresAt: Date;

  @OneToMany(() => Follow, (follow) => follow.user)
  follows: Follow[];

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[]

  @OneToMany(() => QuestionLikes, (like) => like.user)
  questionLikes: QuestionLikes[]

  @OneToMany(() => Answer, (answer) => answer.respondent)
  answers: Answer[]

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
