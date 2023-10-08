import { User } from "src/auth/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Answer } from "./answer.entity";

@Entity()
@Unique(["user", "answer"])
export class AnswerLikes {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.questionLikes,{ onDelete: "CASCADE" })
    user: User

    @ManyToOne(() => Answer, (answer) => answer.likes,{ onDelete: "CASCADE" })
    answer: Answer
}
