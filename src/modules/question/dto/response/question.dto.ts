import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/modules/auth/dto/response/user.dto';


export class QuestionDto {
    @Expose()
    id: string;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    likesCount: number;

    @Expose()
    createdAt: Date;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}