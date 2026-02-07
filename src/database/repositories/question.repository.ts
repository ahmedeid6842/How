import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { BaseRepository } from './base.repository';

export interface QuestionFilter {
  questionId?: string;
  title?: string;
  description?: string;
  authorId?: string;
  creationDate?: string;
}

@Injectable()
export class QuestionRepository extends BaseRepository<Question> {
  constructor(@InjectRepository(Question) repository: Repository<Question>) {
    super(repository);
  }

  async findWithFilter(
    filter: QuestionFilter,
    skip?: number,
    limit?: number,
  ): Promise<Question[]> {
    const queryBuilder = this.repository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.author', 'author');

    if (filter.questionId) {
      queryBuilder.andWhere('question.id = :questionId', {
        questionId: filter.questionId,
      });
    }

    if (filter.title) {
      queryBuilder.andWhere('question.title ILIKE :title', {
        title: `%${filter.title}%`,
      });
    }

    if (filter.description) {
      queryBuilder.andWhere('question.description ILIKE :description', {
        description: `%${filter.description}%`,
      });
    }

    if (filter.authorId) {
      queryBuilder.andWhere('question.authorId = :authorId', {
        authorId: filter.authorId,
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
