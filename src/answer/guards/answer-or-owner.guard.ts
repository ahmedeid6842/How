import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AnswerService } from '../answer.service';

@Injectable()
export class AnswerOrQuestionOwnerGuard implements CanActivate {
    constructor(
        private answerService: AnswerService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const {answerId } = request.params;


        const [answer] = await this.answerService.getAnswer({ answerId });

        if (!answer) {
            throw new NotFoundException("No answer found with givenId")
        }

        if (answer && answer.respondent.id === request.currentUser.id) {
            request.ownerAnswer = answer;
            return true;
        }

console.log(answer.question)
        if (answer.question.author.id === request.currentUser.id) {
            request.ownerAnswer = answer;
            return true;
        }

        throw new UnauthorizedException("You aren't the owner of this answer or question");
    }
}