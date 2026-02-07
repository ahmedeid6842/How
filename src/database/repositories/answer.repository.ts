import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entities/answer.entity';
import { BaseRepository } from './base.repository';

export interface AnswerFilter {
  answerId?: string;
  questionId?: string;
  respondentId?: string;
  answer?: string;
}

@Injectable()
export class AnswerRepository extends BaseRepository<Answer> {
  constructor(@InjectRepository(Answer) repository: Repository<Answer>) {
    super(repository);
  }

  async findWithFilter(
    filter: AnswerFilter,
    skip?: number,
    limit?: number,
  ): Promise<Answer[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('answer')
      .leftJoinAndSelect('answer.respondent', 'respondent')
      .leftJoinAndSelect('answer.question', 'question')
      .leftJoinAndSelect('question.author', 'author');

    if (filter.answerId) {
      queryBuilder.andWhere('answer.id = :answerId', {
        answerId: filter.answerId,
      });
    }

    if (filter.questionId) {
      queryBuilder.andWhere('answer.questionId = :questionId', {
        questionId: filter.questionId,
      });
    }

    if (filter.respondentId) {
      queryBuilder.andWhere('answer.respondentId = :respondentId', {
        respondentId: filter.respondentId,
      });
    }

    if (filter.answer) {
      queryBuilder.andWhere('answer.answer ILIKE :answer', {
        answer: `%${filter.answer}%`,
      });
    }

    if (skip) {
      queryBuilder.skip(skip);
    }

    if (limit) {
      queryBuilder.take(limit);
    }

    return queryBuilder.getMany();
  }
}
