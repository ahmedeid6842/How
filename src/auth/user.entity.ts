import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Follow } from "src/follow/follow.entity";
import { Question } from "src/question/question.entity";
import { QuestionLikes } from "src/question/question-likes.entity";
import { Answer } from "src/answer/answer.entity";
import { Profile } from "src/profile/profile.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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