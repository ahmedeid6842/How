import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreateAnswernDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 500)
    answer: string
}