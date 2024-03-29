import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { QueryQuestionDto } from './dto/query-question.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { QuestionDto } from './dto/question.dto';
import { QuestionOwnerGuard } from './guards/question-owner.guard';
import { OwnerQuestion } from './decorators/owner-question.decorator';
import { Question } from './question.entity';
import { PaginationDto } from 'src/answer/dto/pagination.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Serialize(QuestionDto)
@Controller('question')
export class QuestionController {
    constructor(private questionService: QuestionService) { }

    @UseGuards(AuthGuard)
    @Post("/")
    createQuestion(@Body() body: CreateQuestionDto, @CurrentUser() user: User) {
        return this.questionService.addQuestion(body, user);
    }

    @UseInterceptors(CacheInterceptor)
    @Get("/")
    async getQuestion(@Query() query: QueryQuestionDto, @Query() pagination: PaginationDto) {
        const questions = await this.questionService.getQuestion(query, pagination);

        if (!questions.length) {
            throw new NotFoundException("No question found with the given properties")
        }

        return questions;
    }

    @UseGuards(AuthGuard)
    @UseGuards(QuestionOwnerGuard)
    @Patch("/:questionId")
    async updateQuestion(@OwnerQuestion() question: Question, @Body() body: Partial<CreateQuestionDto>) {
        return this.questionService.updateQuestion(question, body);
    }

    @UseGuards(AuthGuard)
    @UseGuards(QuestionOwnerGuard)
    @Delete("/:questionId")
    async deleteQuestion(@OwnerQuestion() question: Question) {
        return this.questionService.deleteQuestion(question);
    }

    @UseGuards(AuthGuard)
    @Patch("/like/:questionId")
    async likeQuestion(@Param("questionId") questionId: string, @CurrentUser() user: User) {
        return this.questionService.likeQuestion(questionId, user);
    }
}
