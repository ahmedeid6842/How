import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QueryQuestionDto } from './dto/query-question.dto';
import { QuestionLikesService } from './question-likes.service';
import { PaginationDto } from 'src/answer/dto/pagination.dto';

@Injectable()
export class QuestionService {

    constructor(
        @InjectRepository(Question) private readonly questionRepository: Repository<Question>,
        private readonly questionLikesService: QuestionLikesService
    ) { }

    async addQuestion(questionBody: CreateQuestionDto, user: User) {
        const { title, description } = questionBody;
        const uniqueQuestion = await this.getQuestion({ title: title });

        if (uniqueQuestion.length) {
            throw new BadRequestException(`this question title already exists id:${uniqueQuestion[0].id}`)
        }

        const savedQuestion = await this.questionRepository.create({
            author: user,
            title: title,
            description: description
        })

        await this.questionRepository.save(savedQuestion);
    }

    async getQuestion(queryQuestion: QueryQuestionDto, pagination?: PaginationDto) {
        const { questionId, title, description, authorId, creationDate } = queryQuestion;

        const { page, limit } = pagination || {};
        const skip = (page - 1) * limit || 0;

        const queryBuilder = await this.questionRepository.createQueryBuilder('question').leftJoinAndSelect('question.author', 'author');

        if (questionId) {
            queryBuilder.andWhere('question.id = :questionId', { questionId });
        }

        if (title) {
            queryBuilder.andWhere('question.title ILIKE :title', { title: `%${title}%` });
        }

        if (description) {
            queryBuilder.andWhere('question.description ILIKE :description', { description: `%${description}%` });
        }

        if (authorId) {
            queryBuilder.andWhere('question.authorId = :authorId', { authorId });
        }

        const questions = await queryBuilder
            .skip(skip)
            .take(limit)
            .getMany();

        return questions;
    }

    async updateQuestion(question: Question, body: Partial<CreateQuestionDto>) {

        Object.assign(question, body);

        return await this.questionRepository.save(question);
    }

    async deleteQuestion(question: Question) {
        return await this.questionRepository.remove(question);
    }

    async likeQuestion(questionId: string, user: User) {
        const [question] = await this.getQuestion({ questionId });

        if (!question) {
            throw new NotFoundException("No question found with the given id")
        }

        const likeExists = await this.questionLikesService.getLike(questionId, user.id);

        if (likeExists) {
            throw new BadRequestException("you have liked this question before")
        }

        const newLike = this.questionLikesService.addLike(question, user)

        question.likes_count += 1;
        await this.questionRepository.save(question);
    }
}
