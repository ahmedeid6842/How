import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionLikes } from './like.entity';
import { QuestionLikesService } from './question-likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionLikes])],
  providers: [QuestionService,QuestionLikesService],
  controllers: [QuestionController]
})
export class QuestionModule { }
