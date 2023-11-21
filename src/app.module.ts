import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { JwtModule } from "@nestjs/jwt"
import { EmailModule } from './email/email.module';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.entity';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.entity';
import { QuestionLikes } from './question/question-likes.entity';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/answer.entity';
import { AnswerLikes } from './answer/answer-likes.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'
config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Follow, Question, QuestionLikes, Answer, AnswerLikes],
    synchronize: process.env.NODE_ENV == 'development' ? true : false
  }),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '60s' }
  }),
  CacheModule.register({
    isGlobal: true,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }),
    AuthModule,
    EmailModule,
    FollowModule,
    QuestionModule,
    AnswerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
