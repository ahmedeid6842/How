import { Entity, ManyToOne, Unique } from "typeorm";
import { User } from "./user.entity";
import { Answer } from "./answer.entity";
import { BaseEntity } from "./common";

@Entity()
@Unique(["user", "answer"])
export class AnswerLikes extends BaseEntity {
    @ManyToOne(() => User, (user) => user.questionLikes,{ onDelete: "CASCADE" })
    user: User

    @ManyToOne(() => Answer, (answer) => answer.likes,{ onDelete: "CASCADE" })
    answer: Answer
}
