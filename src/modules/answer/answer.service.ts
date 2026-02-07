import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User, Answer } from 'src/database/entities';
import { AnswerRepository } from 'src/database/repositories';
import { CreateAnswernDto } from './dto/create-answer.dto';
import { QuestionService } from 'src/modules/question/question.service';
import { QueryAnswernDto } from './dto/query-answer.dto';
import { AnswerLikesService } from './answer-likes.service';
import { PaginationDto } from './dto/pagination.dto';
import { ProfileService } from 'src/modules/profile/profile.service';

@Injectable()
export class AnswerService {
    constructor(
        private readonly questionService: QuestionService,
        private readonly answerRepository: AnswerRepository,
        private readonly answerLikeService: AnswerLikesService,
        private readonly profileService: ProfileService
    ) { }

    async createAnswer(questionId: string, body: CreateAnswernDto, user: User) {
        const [questionExist] = await this.questionService.getQuestion({ questionId })
        if (!questionExist) {
            throw new NotFoundException("No question found with the given ID ")
        }

        await this.answerRepository.create({
            answer: body.answer,
            question: questionExist,
            respondent: user
        })

        await this.profileService.updateProfileStatistics(user.id, 'numQuestionAnswered', 1)
    }

    async getAnswer(queryAnswer: QueryAnswernDto, pagination?: PaginationDto) {
        const { page, limit } = pagination ?? {};
        const skip = (page - 1) * limit || 0;

        return this.answerRepository.findWithFilter(queryAnswer, skip, limit);
    }

    async updateAnswer(answer: Answer, body: CreateAnswernDto) {
        Object.assign(answer, body);
        return await this.answerRepository.save(answer);
    }

    async deleteAnswer(answer: Answer) {
        await this.profileService.updateProfileStatistics(answer.respondent.id, 'numQuestionAnswered', -1)
        await this.answerRepository.remove(answer)
    }

    async likeAnswer(answerId: string, user: User) {
        const [answer] = await this.getAnswer({ answerId });

        if (!answer) {
            throw new NotFoundException("No answer found with the given id")
        }

        const likeExists = await this.answerLikeService.getLike(answerId, user.id);

        if (likeExists) {
            throw new BadRequestException("you have like this answer before")
        }

        await this.answerLikeService.addLike(answer, user)

        await this.profileService.updateProfileStatistics(user.id, 'numLikes', 1)
        answer.likes_count += 1;
        await this.answerRepository.save(answer)
    }
}
