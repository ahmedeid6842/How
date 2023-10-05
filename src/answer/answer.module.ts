import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { QuestionModule } from 'src/question/question.module';
import { AnswerLikes } from './answer-likes.entity';
import { AnswerLikesService } from './answer-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, AnswerLikes]), QuestionModule],
  controllers: [AnswerController],
  providers: [AnswerService, AnswerLikesService]
})
export class AnswerModule { }
