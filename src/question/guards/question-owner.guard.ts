import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { QuestionService } from '../question.service';

@Injectable()
export class QuestionOwnerGuard implements CanActivate {
    constructor(private questionService: QuestionService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { questionId } = request.params;

        if (!questionId) {
            throw new BadRequestException('No question id provided');
        }

        const [question] = await this.questionService.getQuestion({ questionId });

        if (!question) {
            throw new NotFoundException("Not question found with the given ID")
        }
        
        if (question.author.id !== request.currentUser.id) {
            throw new UnauthorizedException("You aren't the owner of this question");
        }

        request.ownerQuestion = question;

        return true;
    }
}