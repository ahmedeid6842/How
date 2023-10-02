import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @Post("/")
    createQuestion(@Body() body, @CurrentUser() user: User) {
        this.questionService.addQuestion(body, user);
    }
}
