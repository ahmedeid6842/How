import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionLikes } from '../entities/question-likes.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class QuestionLikesRepository extends BaseRepository<QuestionLikes> {
  constructor(
    @InjectRepository(QuestionLikes) repository: Repository<QuestionLikes>,
  ) {
    super(repository);
  }

  async findByQuestionAndUser(
    questionId: string,
    userId: string,
  ): Promise<QuestionLikes | null> {
    if (questionId == null || userId == null) {
      return null;
    }

    return this.repository.findOne({
      where: {
        user: { id: userId },
        question: { id: questionId },
      },
    });
  }
}
