import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 60)
    title: string

    @IsString()
    @Length(10, 500)
    description: string
}