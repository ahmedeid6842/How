import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateAnswernDto } from './dto/create-answer.dto';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class AnswerService {
    constructor(private readonly questionService: QuestionService) { }
    
    createAnswer(questionId: string, body: CreateAnswernDto, user: User) {
        return "answer created"
    }
}
