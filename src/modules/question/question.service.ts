import { Injectable } from '@nestjs/common';
import { User, Question } from 'src/database/entities';
import { QuestionRepository } from 'src/database/repositories';
import {
  BadRequestError,
  NotFoundError,
  QUESTION_ERRORS,
} from 'src/common/exceptions';
import { CreateQuestionDto } from './dto/request/create-question.dto';
import { QueryQuestionDto } from './dto/request/query-question.dto';
import { QuestionLikesService } from './question-likes.service';
import { PaginationDto } from 'src/modules/answer/dto/request/pagination.dto';
import { ProfileService } from 'src/modules/profile/profile.service';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly questionLikesService: QuestionLikesService,
    private readonly profileService: ProfileService,
  ) {}

  async addQuestion(questionBody: CreateQuestionDto, user: User) {
    const { title, description } = questionBody;
    const uniqueQuestion = await this.getQuestion({ title: title });

    if (uniqueQuestion.length) {
      throw new BadRequestError(
        QUESTION_ERRORS.PREFIX.BUSINESS,
        QUESTION_ERRORS.NUMBER.TITLE_ALREADY_EXISTS,
        'question.title_already_exists',
      );
    }

    await this.questionRepository.create({
      author: user,
      title: title,
      description: description,
    });

    await this.profileService.updateProfileStatistics(
      user.id,
      'numQuestionAsked',
      1,
    );
  }

  async getQuestion(
    queryQuestion: QueryQuestionDto,
    pagination?: PaginationDto,
  ) {
    const { page, limit } = pagination || {};
    const skip = (page - 1) * limit || 0;

    return this.questionRepository.findWithFilter(queryQuestion, skip, limit);
  }

  async updateQuestion(question: Question, body: Partial<CreateQuestionDto>) {
    Object.assign(question, body);
    return await this.questionRepository.save(question);
  }

  async deleteQuestion(question: Question) {
    await this.profileService.updateProfileStatistics(
      question.author.id,
      'numQuestionAsked',
      -1,
    );
    return await this.questionRepository.remove(question);
  }

  async likeQuestion(questionId: string, user: User) {
    const [question] = await this.getQuestion({ questionId });

    if (!question) {
      throw new NotFoundError(
        QUESTION_ERRORS.PREFIX.BUSINESS,
        QUESTION_ERRORS.NUMBER.QUESTION_NOT_FOUND,
        'question.question_not_found',
      );
    }

    const likeExists = await this.questionLikesService.getLike(
      questionId,
      user.id,
    );

    if (likeExists) {
      throw new BadRequestError(
        QUESTION_ERRORS.PREFIX.BUSINESS,
        QUESTION_ERRORS.NUMBER.ALREADY_LIKED,
        'question.already_liked',
      );
    }

    const newLike = this.questionLikesService.addLike(question, user);

    await this.profileService.updateProfileStatistics(user.id, 'numLikes', 1);
    question.likesCount += 1;
    await this.questionRepository.save(question);
  }
}
