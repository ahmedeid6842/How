import { Injectable } from '@nestjs/common';
import { Question, User } from 'src/database/entities';
import { QuestionLikesRepository } from 'src/database/repositories';

@Injectable()
export class QuestionLikesService {
  constructor(
    private readonly questionLikesRepository: QuestionLikesRepository,
  ) {}

  async getLike(questionId: string, userId: string) {
    return this.questionLikesRepository.findByQuestionAndUser(
      questionId,
      userId,
    );
  }

  async addLike(question: Question, user: User) {
    return this.questionLikesRepository.create({ user, question });
  }
}
