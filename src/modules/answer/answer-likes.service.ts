import { Injectable } from '@nestjs/common';
import { User, Answer } from 'src/database/entities';
import { AnswerLikesRepository } from 'src/database/repositories';

@Injectable()
export class AnswerLikesService {
  constructor(private readonly answerLikesRepository: AnswerLikesRepository) {}

  async getLike(answerId: string, userId: string) {
    return this.answerLikesRepository.findByAnswerAndUser(answerId, userId);
  }

  async addLike(answer: Answer, user: User) {
    return this.answerLikesRepository.create({ user, answer });
  }
}
