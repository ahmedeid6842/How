import { User } from "src/auth/user.entity";
import { Question } from "src/question/question.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Column, OneToMany } from "typeorm";
import { AnswerLikes } from "./like-answer.entity";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    answer: string

    @CreateDateColumn()
    creation_date: Date;

    @Column({ default: 0 })
    likes_count: number;

    @ManyToOne(() => Question, (question) => question.answers)
    question: Question;

    @ManyToOne(() => User, (user) => user.answers)
    respondent: User;

    @OneToMany(() => AnswerLikes, (answerLike) => answerLike.answer)
    likes: AnswerLikes[]
}