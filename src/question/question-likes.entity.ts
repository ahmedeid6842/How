import { User } from "src/auth/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Question } from "./question.entity";

@Entity()
@Unique(["user", "question"])
export class QuestionLikes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.questionLikes, { onDelete: "CASCADE" })
    user: User

    @ManyToOne(() => Question, (question) => question.likes, { onDelete: "CASCADE" })
    question: Question
}
