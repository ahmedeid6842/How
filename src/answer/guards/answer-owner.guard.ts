import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AnswerService } from "../answer.service";

@Injectable()
export class AnswerOwnerGuard implements CanActivate {
    constructor(private answerService: AnswerService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { answerId } = request.params;

        if (!answerId) {
            throw new BadRequestException('No answer Id provided');
        }

        const [answer] = await this.answerService.getAnswer({ answerId });

        if (!answer) {
            throw new NotFoundException("Not answer found with the given ID")
        }

        if (answer.respondent.id !== request.currentUser.id) {
            throw new UnauthorizedException("You aren't the owner of this answer");
        }

        request.ownerAnswer = answer;

        return true;
    }
}