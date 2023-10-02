import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QueryQuestionDto } from './dto/query-question.dto';

@Injectable()
export class QuestionService {
    constructor(@InjectRepository(Question) private readonly questionRepository: Repository<Question>) { }

    async addQuestion(question: CreateQuestionDto, user: User) {
        const savedQuestion = await this.questionRepository.create({
            author: user,
            title: question.title,
            description: question.description
        })

        await this.questionRepository.save(savedQuestion);
    }

    async getQuestion(queryQuestion: QueryQuestionDto) {
        const { questionId, title, description, authorId, creationDate } = queryQuestion;

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

        const questions = await queryBuilder.getMany();
        
        if (!questions.length) {
            throw new NotFoundException("No question found the given properties")
        }

        return questions;
    }
}
