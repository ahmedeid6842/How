import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { DatabaseModule } from 'src/database';
import { QuestionLikesService } from './question-likes.service';
import { ProfileModule } from 'src/modules/profile/profile.module';

@Module({
  imports: [DatabaseModule, ProfileModule],
  providers: [QuestionService, QuestionLikesService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
