import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateAnswernDto } from './dto/create-answer.dto';
import { QuestionService } from 'src/question/question.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { QueryAnswernDto } from './dto/query-answer.dto';

@Injectable()
export class AnswerService {
    constructor(
        private readonly questionService: QuestionService,
        @InjectRepository(Answer) private readonly answerRepository: Repository<Answer>
    ) { }

    async createAnswer(questionId: string, body: CreateAnswernDto, user: User) {
        const [questionExist] = await this.questionService.getQuestion({ questionId })
        if (!questionExist) {
            throw new NotFoundException("No question found with the given ID ")
        }

        const savedAnswer = await this.answerRepository.create({
            answer: body.answer,
            question: questionExist,
            respondent: user
        })

        await this.answerRepository.save(savedAnswer)
    }

    async getAnswer(queryAnswer: QueryAnswernDto) {
        const { answerId, questionId, respondentId, answer } = queryAnswer;
        const queryBuilder = await this.answerRepository.createQueryBuilder('answer')
            .leftJoinAndSelect('answer.respondent', 'respondent')
            .leftJoinAndSelect('answer.question', 'question')

        if (answerId) {
            queryBuilder.andWhere('answer.id = :answerId', { answerId })
        }

        if (questionId) {
            queryBuilder.andWhere('answer.questionId = :questionId', { questionId })
        }

        if (respondentId) {
            queryBuilder.andWhere('answer.respondentId = :respondentId', { respondentId })
        }

        if (answer) {
            queryBuilder.andWhere('answer.answer ILIKE :answer', { answer: `%${answer}%` });
        }

        const answers = await queryBuilder.getMany();

        return answers;
    }

    async updateAnswer(answer: Answer, body: CreateAnswernDto) {
        Object.assign(answer, body);
        return await this.answerRepository.save(answer);
    }
}
