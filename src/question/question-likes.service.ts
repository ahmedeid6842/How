import { Injectable } from "@nestjs/common";
import { QuestionLikes } from "./question-likes.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Question } from "./question.entity";
import { User } from "src/auth/user.entity";

@Injectable()
export class QuestionLikesService {
    constructor(@InjectRepository(QuestionLikes) private readonly questionLikesRepository: Repository<QuestionLikes>) { }

    async getLike(questionId: string, userId: string) {

        if (questionId == null || userId == null) {
            return null;
        }

        const like = await this.questionLikesRepository.findOne({
            where: {
                user: { id: userId },
                question: { id: questionId },
            },
        });

        return like;
    }

    async addLike(question: Question, user: User) {
        const like = await this.questionLikesRepository.create({
            user,
            question
        })

        return await this.questionLikesRepository.save(like);
    }

}