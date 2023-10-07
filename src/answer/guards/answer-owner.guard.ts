import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AnswerService } from "../answer.service";

@Injectable()
export class AnswerOwnerGuard implements CanActivate {
    constructor(private answerService: AnswerService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { answerId } = request.params;
        console.log("here")
        
        if (!answerId) {
            return false;
        }
        
        const [answer] = await this.answerService.getAnswer({ answerId });
        request.ownerAnswer = answer;

        if (!answer) {
            return false;
        }

        if (answer.respondent.id !== request.currentUser.id) {
            return false;
        }
        
        
        console.log("here22")
        return true;
    }
}