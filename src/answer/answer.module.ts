import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { QuestionModule } from 'src/question/question.module';
import { AnswerLikes } from './answer-likes.entity';
import { AnswerLikesService } from './answer-likes.service';
import { QuestionOwnerGuard } from 'src/question/guards/question-owner.guard';
import { AnswerOwnerGuard } from './guards/answer-owner.guard';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, AnswerLikes]), QuestionModule, ProfileModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerLikesService,AnswerOwnerGuard,QuestionOwnerGuard]
})
export class AnswerModule { }
