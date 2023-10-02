import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule { }
