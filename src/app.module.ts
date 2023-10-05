import { Module } from '@nestjs/common';
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
import { QuestionLikes } from './question/like.entity';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'How',
    entities: [User, Follow, Question, QuestionLikes, Answer],
    synchronize: process.env.NODE_ENV == 'development' ? true : false
  }),
  JwtModule.register({
    global: true,
    secret: "ThisIsMySecert",
    signOptions: { expiresIn: '60s' }
  }),
    AuthModule,
    EmailModule,
    FollowModule,
    QuestionModule,
    AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
