import { Expose, Type } from "class-transformer";
import { UserDto } from "src/auth/dto/user.dto";
import { QuestionDto } from "src/question/dto/question.dto";

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