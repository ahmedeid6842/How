import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { QuestionService } from '../question.service';

@Injectable()
export class QuestionOwnerGuard implements CanActivate {
    constructor(private questionService: QuestionService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { questionId } = request.params;
        console.log("here22")

        if (!questionId) {
            return false;
        }

        const [question] = await this.questionService.getQuestion({ questionId });
        request.ownerQuestion = question;

        if (!question) {
            return false;
        }

        if (question.author.id !== request.currentUser.id) {
            return false;
        }

        return true;
    }
}