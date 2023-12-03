import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionLikes } from './question-likes.entity';
import { QuestionLikesService } from './question-likes.service';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionLikes]), ProfileModule],
  providers: [QuestionService,QuestionLikesService],
  controllers: [QuestionController],
  exports:[QuestionService]
})
export class QuestionModule { }
