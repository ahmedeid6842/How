import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Follow, Question, QuestionLikes, Answer, AnswerLikes, Profile } from './entities';
import {
    UserRepository,
    AnswerRepository,
    AnswerLikesRepository,
    QuestionRepository,
    QuestionLikesRepository,
    FollowRepository,
    ProfileRepository,
} from './repositories';

const entities = [User, Follow, Question, QuestionLikes, Answer, AnswerLikes, Profile];

const repositories = [
    UserRepository,
    AnswerRepository,
    AnswerLikesRepository,
    QuestionRepository,
    QuestionLikesRepository,
    FollowRepository,
    ProfileRepository,
];

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: [...repositories],
    exports: [TypeOrmModule, ...repositories],
})
export class DatabaseModule {}
