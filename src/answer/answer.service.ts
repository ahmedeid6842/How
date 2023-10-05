import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateAnswernDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
    createAnswer(questionId: string, body: CreateAnswernDto, user: User) {
        return "answer created"
    }
}
