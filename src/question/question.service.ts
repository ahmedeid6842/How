import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@Injectable()
export class QuestionService {
    addQuestion(question, user: User) {
        return "question added";
    }
}
