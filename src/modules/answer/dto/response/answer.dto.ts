import { Expose, Type } from "class-transformer";
import { UserDto } from "src/modules/auth/dto/response/user.dto";
import { QuestionDto } from "src/modules/question/dto/response/question.dto";

export class AnswerDto {
    @Expose()
    id: string;

    @Expose()
    answer: string

    @Expose()
    @Type(() => QuestionDto)
    question: QuestionDto

    @Expose()
    @Type(() => UserDto)
    respondent: UserDto
}