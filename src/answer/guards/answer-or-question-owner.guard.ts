import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AnswerOwnerGuard } from './answer-owner.guard';
import { QuestionOwnerGuard } from 'src/question/guards/question-owner.guard';

@Injectable()
export class AnswerOrQuestionOwnerGuard implements CanActivate {
  constructor(
    private answerOwnerGuard: AnswerOwnerGuard,
    private questionOwnerGuard: QuestionOwnerGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [answerOwnerResult, questionOwnerResult] = await Promise.all([
      this.answerOwnerGuard.canActivate(context),
      this.questionOwnerGuard.canActivate(context),
    ]);

    return answerOwnerResult || questionOwnerResult;
  }
}