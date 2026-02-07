import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { DatabaseModule } from 'src/database';
import { QuestionModule } from 'src/modules/question/question.module';
import { AnswerLikesService } from './answer-likes.service';
import { QuestionOwnerGuard } from 'src/modules/question/guards/question-owner.guard';
import { AnswerOwnerGuard } from './guards/answer-owner.guard';
import { ProfileModule } from 'src/modules/profile/profile.module';

@Module({
  imports: [DatabaseModule, QuestionModule, ProfileModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerLikesService, AnswerOwnerGuard, QuestionOwnerGuard]
})
export class AnswerModule { }
