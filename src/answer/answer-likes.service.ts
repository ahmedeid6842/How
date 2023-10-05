import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { AnswerLikes } from "./answer-likes.entity";
import { Answer } from "./answer.entity";

@Injectable()
export class AnswerLikesService {
    constructor(@InjectRepository(AnswerLikes) private readonly answerLikesRepository: Repository<AnswerLikes>) { }

    async getLike(answerId: string, userId: string) {

        if (answerId == null || userId == null) {
            return null;
        }

        const like = await this.answerLikesRepository.findOne({
            where: {
                user: { id: userId },
                answer: { id: answerId },
            },
        });

        return like;
    }

    async addLike(answer: Answer, user: User) {
        const like = await this.answerLikesRepository.create({
            user,
            answer
        })

        return await this.answerLikesRepository.save(like);
    }

}