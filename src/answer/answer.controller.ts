import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateAnswernDto } from './dto/create-answer.dto';

@Controller('answer')
export class AnswerController {
    constructor(private answerSerivce: AnswerService) { }

    @UseGuards(AuthGuard)
    @Post("/:questionId")
    async createAnswer(@Param('questionId') questionId: string, @Body() body: CreateAnswernDto, @CurrentUser() user: User) {
        await this.answerSerivce.createAnswer(questionId, body, user)
    }
}
