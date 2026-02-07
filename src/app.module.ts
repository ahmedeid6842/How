import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import { I18nModule, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
import * as redisStore from 'cache-manager-redis-store';
import {
  User,
  Follow,
  Question,
  QuestionLikes,
  Answer,
  AnswerLikes,
  Profile,
} from './database/entities';
import { ResponseWrapperInterceptor } from './core/interceptors/response-wrapper.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { FollowModule } from './modules/follow/follow.module';
import { QuestionModule } from './modules/question/question.module';
import { AnswerModule } from './modules/answer/answer.module';
import { ProfileModule } from './modules/profile/profile.module';
import { DomainExceptionFilter } from './core/filters/domain-exception.filter';
import { RequestIdMiddleware } from './core/middleware/request-id.middleware';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [
        User,
        Follow,
        Question,
        QuestionLikes,
        Answer,
        AnswerLikes,
        Profile,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ttl: parseInt(process.env.REDIS_EXPIRE_IN_SECONDS),
      max: parseInt(process.env.REDIS_MAX_ROWS),
      url: process.env.REDIS_URL,
    }),
    AuthModule,
    EmailModule,
    FollowModule,
    QuestionModule,
    AnswerModule,
    ProfileModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/common/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseWrapperInterceptor },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
