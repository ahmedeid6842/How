import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateAnswernDto } from './dto/create-answer.dto';
import { QueryAnswernDto } from './dto/query-answer.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AnswerDto } from './dto/answer.dto';
import { Answer } from './answer.entity';
import { AnswerOwnerGuard } from './guards/answer-owner.guard';
import { OwnerAnswer } from './decorators/owner-answer.decorator';

@Serialize(AnswerDto)
@Controller('answer')
export class AnswerController {
    constructor(private answerSerivce: AnswerService) { }

    @UseGuards(AuthGuard)
    @Post("/:questionId")
    async createAnswer(@Param('questionId') questionId: string, @Body() body: CreateAnswernDto, @CurrentUser() user: User) {
        return await this.answerSerivce.createAnswer(questionId, body, user)
    }

    @Get("/")
    async getAnswer(@Query() query: QueryAnswernDto) {
        const answers = await this.answerSerivce.getAnswer(query);
        if (!answers.length) {
            throw new NotFoundException("No answer found with the given properties")
        }

        return answers
    }

    @UseGuards(AuthGuard)
    @UseGuards(AnswerOwnerGuard)
    @Patch("/:answerId")
    async UpdateAnswer(@OwnerAnswer() answer: Answer, @Body() body: CreateAnswernDto) {
        return await this.answerSerivce.updateAnswer(answer, body)
    }

    @UseGuards(AuthGuard)
    @UseGuards(AnswerOwnerGuard)
    @Delete("/:answerId")
    async deleteAnswer(@OwnerAnswer() answer: Answer) {
        return await this.answerSerivce.deleteAnswer(answer)
    }
}
