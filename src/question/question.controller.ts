import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @UseGuards(AuthGuard)
    @Post("/")
    createQuestion(@Body() body: CreateQuestionDto, @CurrentUser() user: User) {
        this.questionService.addQuestion(body, user);
    }

    @Get("/")
    getQuestion(@Query() query) {
        this.questionService.getQuestion(query);
    }
}
