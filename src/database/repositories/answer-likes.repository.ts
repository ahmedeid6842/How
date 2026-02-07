import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerLikes } from '../entities/answer-likes.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class AnswerLikesRepository extends BaseRepository<AnswerLikes> {
  constructor(
    @InjectRepository(AnswerLikes) repository: Repository<AnswerLikes>,
  ) {
    super(repository);
  }

  async findByAnswerAndUser(
    answerId: string,
    userId: string,
  ): Promise<AnswerLikes | null> {
    if (answerId == null || userId == null) {
      return null;
    }

    return this.repository.findOne({
      where: {
        user: { id: userId },
        answer: { id: answerId },
      },
    });
  }
}
