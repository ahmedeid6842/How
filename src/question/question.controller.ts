import { Body, Controller, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { QueryQuestionDto } from './dto/query-question.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDto } from './dto/question.dto';
import { QuestionOwnerGuard } from './guards/question-owner.guard';

@Serialize(QuestionDto)
@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @UseGuards(AuthGuard)
    @Post("/")
    createQuestion(@Body() body: CreateQuestionDto, @CurrentUser() user: User) {
        return this.questionService.addQuestion(body, user);
    }

    @Get("/")
    async getQuestion(@Query() query: QueryQuestionDto) {
        const questions = await this.questionService.getQuestion(query);

        if (!questions.length) {
            throw new NotFoundException("No question found with the given properties")
        }

        return questions;
    }

    @UseGuards(QuestionOwnerGuard)
    @Patch("/:questionId")
    async updateQuestion(@Param("questionId") questionId: string, @Body() body: Partial<CreateQuestionDto>, @CurrentUser() user: User) {
        return this.questionService.updateQuestion(questionId, body, user);
    }
}
