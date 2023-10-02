import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Question } from './question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';

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

    async getQuestion(questionQuery) {
        return { title: "qeustion title", description: "question description" }
    }
}
